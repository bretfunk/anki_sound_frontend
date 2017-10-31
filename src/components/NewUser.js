import React, {Component} from 'react'
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Enter email',
      password: 'Enter password',
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
    alert("\"" + this.state.email + "\" was submitted with " + this.state.password);
    this.createUser()
  }

  //user is created but get weird server 500 error
  createUser() {
    const email = this.state.email
    const password = this.state.password
    let data = { email: email, password_digest: password }
    //axios.post("https://protected-thicket-11517.herokuapp.com/api/user_token",
    axios.post('http://localhost:4000/api/users',
      data
    )
      .then((response) => {
        alert('user created!')
      })
      .catch((error) => {
        alert(error)
      })
    }

  render() {
    return (
      <div>
      <h1>
      Create User:
      </h1>
      <form onSubmit={this.handleSubmit}>
      <label>
      Email:
      </label>
      <input type="email" value={this.state.email} onChange={this.handleEmailChange}/>
      <br />
      <label>
      Password:
      </label>
      <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
      <br />
      <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}

export default Login;
