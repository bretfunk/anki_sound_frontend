import React, { Component } from 'react';
import Profile from './Profile'

class SideWindow extends Component {
  render() {
    return (
      <div>
      <Profile jwt={this.props.jwt} />
      </div>
    )
  }
}

export default SideWindow;

