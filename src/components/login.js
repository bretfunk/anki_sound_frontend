import React, {Component} from 'react';
import axios from 'axios';
import URL from '../url';
import { connect } from 'react-redux';
import {
  CHANGE_LOGGED_IN,
  CHANGE_TRYING_TO_LOGIN,
  CHANGE_TRYING_TO_CREATE_USER,
  SET_JWT,
  RESET_JWT,
  SET_ID,
  RESET_ID
} from '../store/constants/action-types';
import {
  changeLoggedIn,
  loggingIn,
  creatingUser,
  setJwt,
  resetJwt,
  setId,
  resetId
} from '../store/actions/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.login = this.login.bind(this)
    //this.changeJwt = this.changeJwt.bind(this)
    this.getUserId = this.getUserId.bind(this)
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

  //this function is because the dispatches can't be called from inside the promise
  //still not working tho
  //loginFunctionCalls(data) {
    //this.props.changeJwt(data.data.jwt)
    //this.props.changeLoggedIn()
    //this.props.loggingIn()
  //}
  //

  login() {
    const email = this.state.email
    const password = this.state.password
    axios.post(URL() + 'api/user_token',
      {"auth": {"email": email, "password": password}}
    )
      .then((data) => {
        this.props.setJwt(data.data.jwt)
        //this.props.changeJwt(data.data.jwt)
        this.getUserId(data.data.jwt)
        this.props.changeLoggedIn()

        //this.props.changeJwt(data.data.jwt)
        //this.props.changeLoggedIn()
        //for some reason this doesn't work when calling loggingIn
        //this.props.loggingIn()
      })
      .catch((error) => {
        alert(error)
      })
  }

  getUserId(jwt) {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    }
    axios.get(URL() + 'api/user',
      config
    )
      .then((response) => {
        //alert(response.data.id)
        this.props.setId({ userId: response.data.id })
        //alert(this.props.userId)
        //this.setState({ userId: response.data.id })
      })
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
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.heading.loggedIn,
    tryingToLogin: state.heading.tryingToLogin,
    tryingToCreateUser: state.heading.tryingToCreateUser,
    languageHash: state.random.languageHash,
    jwt: state.login.jwt,
    userId: state.login.userId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeLoggedIn: () => dispatch({ type: CHANGE_LOGGED_IN }),
    loggingIn: () => dispatch({ type: CHANGE_TRYING_TO_LOGIN }),
    creatingUser: () => dispatch({ type: CHANGE_TRYING_TO_CREATE_USER }),
    setJwt: (jwt) => dispatch({ type: SET_JWT, jwt: jwt}),
    resetJwt: () => dispatch({ type: RESET_JWT }),
    setId: (userId) => dispatch({ type: SET_ID, userId }),
    resetId: () => dispatch({ type: RESET_ID })
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (Login);

//export default Login;
