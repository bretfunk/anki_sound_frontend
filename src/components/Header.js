import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  CHANGE_LOGGED_IN,
  CHANGE_TRYING_TO_LOGIN,
  CHANGE_TRYING_TO_CREATE_USER,
  RESET_JWT,
  RESET_ID,
  RESET_SAVED_PHRASES,
  RESET_STATE
} from '../store/constants/action-types';
import {
  resetJwt,
  resetId,
  resetSavedPhrases,
  resetState
} from '../store/actions/index';

class Header extends Component {
  constructor(props) {
    super(props)
    this.log = this.log.bind(this)
    this.new = this.new.bind(this)
    this.exitProgram = this.exitProgram.bind(this)
  }

  exitProgram() {
    this.props.changeLoggedIn()
    this.props.resetJwt()
    this.props.resetId()
    this.props.resetSavedPhrases()
    this.props.resetState()
  }

  log=(event)=>{
    event.preventDefault()
    this.props.loggingIn()
  }

  logOut=(event)=>{
    event.preventDefault()
    this.exitProgram()
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
    creatingUser: () => dispatch({ type: CHANGE_TRYING_TO_CREATE_USER }),
    resetJwt: () => dispatch({ type: RESET_JWT }),
    resetId: () => dispatch({ type: RESET_ID }),
    resetSavedPhrases: () => dispatch({ type: RESET_SAVED_PHRASES }),
    resetState: () => ({ type: RESET_STATE })
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (Header);
//export default Header;


