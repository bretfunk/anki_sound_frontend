import React, { Component } from 'react';
import Profile from './Profile'

class SideWindow extends Component {
  render() {
    return (
      <div className="mainWindowColor">
      <Profile dbPhrases={this.props.dbPhrases} getSavedPhrases={this.props.getSavedPhrases}
      format={this.props.format} removeFromDb={this.props.removeFromDb}
      jwt={this.props.jwt} />
      </div>
    )
  }
}

export default SideWindow;

