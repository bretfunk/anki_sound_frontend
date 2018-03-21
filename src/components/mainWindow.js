import React, { Component } from 'react';
import Body from './Body';

class MainWindow extends Component {
  render() {
    this.state = {
    }
    return (
      <div className="mainWindowColor">
        <Body
          format={this.props.format}
          formatFileName={this.props.formatFileName}
          createFile={this.props.createFile}
        />
      </div>
    )
  }
}

export default MainWindow;
