import React, { Component } from 'react';
import Body from './Body'

class MainWindow extends Component {
  render() {
    this.state = {
    }
    return (
      <div className="mainWindowColor">
        <Body
          play={this.props.play}
          audio={this.props.audio}
        />
      </div>
    )
  }
}

export default MainWindow;
