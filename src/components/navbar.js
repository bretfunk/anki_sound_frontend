import React, { Component } from 'react';

class Navbar extends Component {
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
      <nav className="navbar navbar-inverse bg-inverse">
        <a className="navbar-brand" href="#">AnkiSound</a>
            <button className="btn btn-primary" onClick={this.new}>Create User</button>
            <button className="btn btn-primary" onClick={this.log}>Login</button>
      </nav>
    )
  }
}

export default Navbar;


