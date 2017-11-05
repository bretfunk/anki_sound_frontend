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

  new=(event)=>{
    event.preventDefault()
    this.props.creatingUser()
  }

  render() {
    return (
      <div className="container-fluid customNavbar rounded navbarColor">
        <div className="inline row">
          <div className="col-9">
      <h1 className="col-sm navbar-brand text-white">AnkiSound</h1>
          </div>
          <div className="col-2">
      <button className="col-sm btn secondaryButtonColor margin-right" onClick={this.new}>Create User</button>
          </div>
          <div className="col-1">
      <button className="col-sm btn secondaryButtonColor text-right"  onClick={this.log}>Login</button>
        </div>
        </div>
      </div>
    )
  }
}

export default Header;


