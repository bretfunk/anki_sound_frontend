import React, { Component } from 'react';
import axios from 'axios'

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
    axios.get('http://localhost:4000/api/phrases',
      config
    )
      .then((response) => {
        this.setState({response: response.data})
      })
  }

    savedPhrases(array) {
      return array.map((phrase, i) =>
      <li key={'phrase_' + i}><span className="btn-sm bg-danger text-white btn text-left">
        {phrase.language}:</span> {phrase.phrase}</li>
      )
    }

  //to show phrases add the below to render, however the server will run nonstop as it keeps rendering over and over
      //{this.getSavedPhrases()}
  render() {
      {this.getSavedPhrases()}
    return (
      <div>
      <br />
      <h1 className="bg-primary text-white rounded heading">Saved Phrases</h1>
      <ul><h4>{this.savedPhrases(this.state.response)}</h4></ul>
      </div>
    );
  }
}

export default Profile;
