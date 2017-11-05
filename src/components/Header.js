import React, { Component } from 'react';

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
    if (this.props.loggedIn) {
      createUser =
        <div className="col-2">
        </div>
    } else {
      createUser =
          <div className="col-2">
      <button className="col-sm btn secondaryButtonColor" onClick={this.new}>Create User</button>
          </div>
      }

    let loginOrLogout;
    if (this.props.loggedIn) {
      loginOrLogout =
          <div className="col-2">
      <button className="col-sm btn secondaryButtonColor"  onClick={this.logOut}>Logout</button>
        </div>
  } else {
    loginOrLogout =
          <div className="col-2">
      <button className="col-sm btn secondaryButtonColor"  onClick={this.log}>Login</button>
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

export default Header;


