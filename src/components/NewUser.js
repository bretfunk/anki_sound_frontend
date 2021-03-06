import React, { Component } from "react";
import axios from "axios";
import URL from "../url";
import { connect } from "react-redux";
import { creatingUser } from "../ducks/Heading";

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createuser = this.createUser.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.createUser();
  }

  //TODO login user upon creation
  createUser() {
    const email = this.state.email;
    const password = this.state.password;
    let data = { email: email, password: password };
    axios
      .post(URL() + "api/users", data)
      .then(response => {
        this.props.creatingUser();
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <div className="mx-auto">
        <form onSubmit={this.handleSubmit}>
          <h5>
            Email:
            <input
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <input
              className="btn-sm btn mainButtonColor"
              type="submit"
              value="Create Account"
            />
          </h5>
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({ tryingToCreateUser: state.heading.tryingToCreateUser }),
  { creatingUser }
)(NewUser);
