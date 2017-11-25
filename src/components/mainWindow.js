import React, { Component } from 'react';
import Body from './Body'

class MainWindow extends Component {
  render() {
    this.state = {
    }
    return (
    <div className="mainWindowColor">
      <Body play={this.props.play} createFile={this.props.createFile} format={this.props.format}
      savedPhrases={this.props.savedPhrases} submitPhrase={this.props.submitPhrase} audio={this.props.audio} addToDb={this.props.addToDb} loggedIn={this.props.loggedIn}/>
      </div>
    )
  }
}

export default MainWindow;
