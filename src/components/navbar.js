import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.log = this.log.bind(this)
  }

  log=(event)=>{
    event.preventDefault()
    debugger
    this.props.loggingIn()
  }

  render() {

    return (
      <nav className="navbar navbar-inverse bg-inverse">
        <a className="navbar-brand" href="#">AnkiSound</a>
            <button className="btn btn-primary" onClick={this.log}>Login</button>
      </nav>
    )
  }
}

export default Navbar;


