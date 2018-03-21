import React, { Component } from 'react';
import Profile from './Profile'

class SideWindow extends Component {
  render() {
    return (
      <div className="mainWindowColor">
        <Profile
          format={this.props.format}
          formatFileName={this.props.formatFileName}
          createFile={this.props.createFile}
        />
      </div>
    )
  }
}

export default SideWindow;
