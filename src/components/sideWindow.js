import React, { Component } from 'react';
import Login from './Login'
import Profile from './Profile'
import NewUser from './NewUser'

class SideWindow extends Component {
  render() {
    return (
      <div>
      <NewUser />
      <Login />
      <Profile />
      </div>
    )
  }
}

export default SideWindow;

