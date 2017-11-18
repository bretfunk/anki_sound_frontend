import React, { Component } from 'react';
import Profile from './Profile'

class SideWindow extends Component {
  render() {
    return (
      <div className="mainWindowColor">
      <Profile deletePhrase={this.props.deletePhrase} format={this.props.format} jwt={this.props.jwt} />
      </div>
    )
  }
}

export default SideWindow;

