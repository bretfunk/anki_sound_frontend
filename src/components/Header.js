import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  CHANGE_LOGGED_IN,
  CHANGE_TRYING_TO_LOGIN,
  CHANGE_TRYING_TO_CREATE_USER
} from '../store/constants/action-types';
//import {
  //changeLoggedIn,
  //loggingIn,
  //creatingUser
//} from '../store/actions/index';

class Header extends Component {
  constructor(props) {
    super(props)
    this.log = this.log.bind(this)
    this.new = this.new.bind(this)
  }

  log=(event)=>{
    event.preventDefault()
    this.props.loggingIn()
  }

  logOut=(event)=>{
    event.preventDefault()
    this.props.logOut()
  }

  new=(event)=>{
    event.preventDefault()
    this.props.creatingUser()
  }

  render() {
    let createUser;
    if (this.props.tryingToCreateUser) {
      createUser =
        <div className="col-2">
          <button
            className="col-sm btn secondaryButtonColor"
            onClick={this.new}>Create User
          </button>
        </div>
    } else {
      createUser =
        <div className="col-2">
          <button
            className="col-sm btn secondaryButtonColor"
            onClick={this.new}>Create User
          </button>
        </div>
    }

    let loginOrLogout;
    if (this.props.loggedIn) {
      loginOrLogout =
        <div className="col-2">
          <button
            className="col-sm btn secondaryButtonColor"
            onClick={this.logOut}>Logout
          </button>
        </div>
    } else {
      loginOrLogout =
        <div className="col-2">
          <button
            className="col-sm btn secondaryButtonColor"
            onClick={this.log}>Login
          </button>
        </div>
    }

    return (
      <div className="container-fluid customNavbar rounded navbarColor">
        <div className="inline row">
          <div className="col-8">
            <h1 className="col-sm navbar-brand text-white">AnkiSound</h1>
          </div>
          {createUser}
          {loginOrLogout}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.heading.loggedIn,
    tryingToLogin: state.heading.tryingToLogin,
    tryingToCreateUser: state.heading.tryingToCreateUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeLoggedIn: () => dispatch({ type: CHANGE_LOGGED_IN }),
    loggingIn: () => dispatch({ type: CHANGE_TRYING_TO_LOGIN }),
    creatingUser: () => dispatch({ type: CHANGE_TRYING_TO_CREATE_USER })
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (Header);
//export default Header;


