import React, {Component} from 'react';
import axios from 'axios';
import URL from '../url';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
  }

  handleEmailChange(event) {
    event.preventDefault();
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    event.preventDefault();
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.login()
  }

  login() {
    const email = this.state.email
    const password = this.state.password
    axios.post(URL() + 'api/user_token',
        {"auth": {"email": email, "password": password}}
    )
      .then((data) => {
        this.props.changeJwt(data.data.jwt)
        this.props.changeLoggedIn()
        this.props.loggingIn()
      })
      .catch((error) => {
        alert(error)
      })
    }

  render() {
    return (
      <div className="mx-auto">
      <form onSubmit={this.handleSubmit}>
      <h5>
      Email:
      <input type="email" value={this.state.email} onChange={this.handleEmailChange}/>
      Password:
      <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
      <input className="btn btn-sm mainButtonColor" type="submit" value="Login" />
      </h5>
      </form>
      </div>
    )
  }
}

export default Login;
