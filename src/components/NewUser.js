import React, {Component} from 'react'
import axios from 'axios'
import URL from '../url'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createuser = this.createUser.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.createUser()
  }

  createUser() {
    const email = this.state.email
    const password = this.state.password
    let data = { email: email, password_digest: password }
    axios.post(URL() + 'api/users',
      data
    )
      .then((response) => {
        this.props.creatingUser()
        alert('user created!')
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
      <input className="btn mainButtonColor" type="submit" value="Create Account" />
      </h5>
      </form>
      </div>
    )
  }
}

export default Login;
