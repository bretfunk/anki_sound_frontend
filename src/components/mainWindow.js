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
          format={this.props.format}
          savePhrase={this.props.savePhrase}
          savedPhrases={this.props.savedPhrases}
          submitPhrase={this.props.submitPhrase}
          audio={this.props.audio}
          addToDb={this.props.addToDb}
        />
      </div>
    )
  }
}

export default MainWindow;
