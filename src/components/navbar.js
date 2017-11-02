import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse bg-inverse">
        <a className="navbar-brand" href="#">AnkiSound</a>
            <button className="btn btn-primary">Login</button>
      </nav>
    )
  }
}

export default Navbar;


