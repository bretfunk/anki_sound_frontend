import React, { Component } from 'react';
import Profile from './Profile'

class SideWindow extends Component {
  render() {
    return (
      <div className="sideWindowColor">
      <Profile format={this.props.format} jwt={this.props.jwt} />
      </div>
    )
  }
}

export default SideWindow;

