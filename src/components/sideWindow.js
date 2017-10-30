import React, { Component } from 'react';
import Login from './login'
import Profile from './profile'

class SideWindow extends Component {
  render() {
    return (
      <div>
      <Login />
      <Profile />
      </div>
    )
  }
}

export default SideWindow;

