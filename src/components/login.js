import React, { Component } from "react";
import axios from "axios";
import URL from "../url";
import { connect } from "react-redux";
import { changeLoggedIn } from "../ducks/Heading";
import { setJwt, setId } from "../ducks/Login";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.getUserId = this.getUserId.bind(this);
  }

  handleEmailChange(event) {
    event.preventDefault();
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    event.preventDefault();
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.login();
  }

  login() {
    const email = this.state.email;
    const password = this.state.password;
    axios
      .post(URL() + "api/user_token", {
        auth: { email: email, password: password }
      })
      .then(data => {
        this.props.setJwt(data.data.jwt);
        this.getUserId(data.data.jwt);
        this.props.changeLoggedIn();
      })
      .catch(error => {
        alert(error);
      });
  }

  getUserId(jwt) {
    let config = {
      headers: {
        Authorization: "Bearer " + jwt
      }
    };
    axios.get(URL() + "api/user", config).then(response => {
      this.props.setId(response.data.id);
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
              className="btn btn-sm mainButtonColor"
              type="submit"
              value="Login"
            />
          </h5>
        </form>
      </div>
    );
  }
}

export default connect(state => ({ jwt: state.login.jwt }), {
  changeLoggedIn,
  setJwt,
  setId
})(Login);
