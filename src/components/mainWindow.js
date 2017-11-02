import React, { Component } from 'react';
import Form from './Form'
import Body from './Body'

class MainWindow extends Component {
  render() {
    this.state = {
    }
    return (
    <div>
      <Body loggedIn={this.props.loggedIn}/>
      </div>
    )
  }
}

export default MainWindow;
