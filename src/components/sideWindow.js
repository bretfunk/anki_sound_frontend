import React, { Component } from 'react';
import Login from './Login'
import Profile from './Profile'

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

