import React, { Component } from 'react';
import axios from 'axios'
import URL from '../url'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: []
    }
    this.getSavedPhrases = this.getSavedPhrases.bind(this);
    this.savedPhrases = this.savedPhrases.bind(this);
  }

  getSavedPhrases() {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.props.jwt
      }
    }
    axios.get(URL() + 'api/phrases',
      config
    )
      .then((response) => {
        this.setState({response: response.data})
      })
  }

    savedPhrases(array) {
      return array.map((phrase, i) =>
      <li key={'phrase_' + i}><span className="btn-sm languageButtonColor text-dark btn text-left">
        {phrase.language}:&nbsp;&nbsp;</span> {phrase.phrase}&nbsp;&nbsp;<a className="btn text-dark"
        href={this.props.format(phrase)} className="btn mainButtonColor btn-sm text-dark text-right">Download</a></li>
      )
    }

  render() {
      {this.getSavedPhrases()}
    return (
      <div>
      <br />
      <h1 className="bannerColor text-white rounded heading">Saved Phrases</h1>
      <ul><h4>{this.savedPhrases(this.state.response)}</h4></ul>
      </div>
    );
  }
}

export default Profile;
