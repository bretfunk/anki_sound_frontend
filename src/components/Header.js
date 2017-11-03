import React, { Component } from 'react';
import { NavDropdown, MenuItem, Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';

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
      <div className="container-fluid customNavbar rounded">
        <div className="inline row">
          <div className="col-9">
      <text className="col-sm navbar-brand">AnkiSound</text>
          </div>
          <div className="col-2">
      <button className="col-sm btn btn-primary margin-right" onClick={this.new}>Create User</button>
          </div>
          <div className="col-1">
      <button className="col-sm btn btn-primary text-right" onClick={this.log}>Login</button>
        </div>
        </div>
      </div>
    )
  }
}

export default Header;


