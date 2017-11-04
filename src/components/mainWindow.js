import React, { Component } from 'react';
import Body from './Body'

class MainWindow extends Component {
  render() {
    this.state = {
    }
    return (
    <div>
      <Body addToDb={this.props.addToDb} loggedIn={this.props.loggedIn}/>
      </div>
    )
  }
}

export default MainWindow;
