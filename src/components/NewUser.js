import React, {Component} from 'react'
import axios from 'axios'

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
      <div className="mx-auto">
      <form onSubmit={this.handleSubmit}>
      <h4>
      Email:
      <input type="email" value={this.state.email} onChange={this.handleEmailChange}/>
      Password:
      <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
      <input className="btn btn-primary" type="submit" value="Create Account" />
      </h4>
      </form>
      </div>
    )
  }
}

export default Login;
