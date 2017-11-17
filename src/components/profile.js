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
      <tr><td className="btn-sm languageButtonColor text-dark btn text-left">
        {phrase.language}:</td><td><h4>{phrase.phrase}</h4></td>
        <td><a className="btn text-dark" href={this.props.format(phrase)}
        className="btn mainButtonColor btn-sm text-dark text-right" download>Download</a></td></tr>
      )
    }

  render() {
      {this.getSavedPhrases()}
    return (
      <div>
      <br />
      <h1 className="bannerColor text-white rounded heading">Saved Phrases</h1>
      <table width="100%">
      <tbody>
      {this.savedPhrases(this.state.response)}
      </tbody>
      </table>
      </div>
    );
  }
}


export default Profile;
