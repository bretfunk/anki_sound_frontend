import React, { Component } from "react";
import { connect } from "react-redux";
import { resetSavedPhrases, resetState } from "../ducks/Phrase";
import { changeLoggedIn, loggingIn, creatingUser } from "../ducks/Heading";
import { resetJwt, resetId } from "../ducks/Login";

class Header extends Component {
  constructor(props) {
    super(props);
    this.log = this.log.bind(this);
    this.new = this.new.bind(this);
    this.exitProgram = this.exitProgram.bind(this);
  }

  exitProgram() {
    this.props.resetState();
    //this.props.resetSavedPhrases()
    this.props.resetJwt();
    this.props.resetId();
    this.props.changeLoggedIn();
  }

  log = event => {
    event.preventDefault();
    this.props.loggingIn();
  };

  logOut = event => {
    event.preventDefault();
    this.exitProgram();
  };

  new = event => {
    event.preventDefault();
    this.props.creatingUser();
  };

  render() {
    let createUser;
    if (this.props.tryingToCreateUser && !this.props.loggedIn) {
      createUser = (
        <div className="col-2">
          <button
            className="col-sm btn secondaryButtonColor"
            onClick={this.new}
          >
            Sign up
          </button>
        </div>
      );
    } else if (this.props.loggedIn) {
      createUser = (
        <div className="col-2">
          <button
            style={{ display: "none" }}
            className="col-sm btn secondaryButtonColor"
          >
            Hidden
          </button>
        </div>
      );
    } else {
      createUser = (
        <div className="col-2">
          <button
            className="col-sm btn secondaryButtonColor"
            onClick={this.new}
          >
            Sign Up
          </button>
        </div>
      );
    }

    let loginOrLogout;
    if (this.props.loggedIn) {
      loginOrLogout = (
        <div className="col-2">
          <button
            className="col-sm btn secondaryButtonColor"
            onClick={this.logOut}
          >
            Logout
          </button>
        </div>
      );
    } else {
      loginOrLogout = (
        <div className="col-2">
          <button
            className="col-sm btn secondaryButtonColor"
            onClick={this.log}
          >
            Login
          </button>
        </div>
      );
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
    );
  }
}

export default connect(
  state => ({
    loggedIn: state.heading.loggedIn,
    tryingToCreateUser: state.heading.tryingToCreateUser
  }),
  {
    changeLoggedIn,
    loggingIn,
    creatingUser,
    resetJwt,
    resetId,
    resetSavedPhrases,
    resetState
  }
)(Header);
