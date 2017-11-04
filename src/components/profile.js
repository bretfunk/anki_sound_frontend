import React, { Component } from 'react';
import axios from 'axios'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      fakeJWT: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDk1OTEyMjMsInN1YiI6Mn0.O4N_865AQCXiyigEmBPCRtOKAJCHJfRMP6fdcnR2pTc"
    }
    this.getSavedPhrases = this.getSavedPhrases.bind(this);
    this.savedPhrases = this.savedPhrases.bind(this);
  }

  getSavedPhrases() {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.fakeJWT
      }
    }
    axios.get('http://localhost:4000/api/phrases',
      config
    )
      .then((response) => {
        this.setState({response: response.data})
        //debugger
      })
  }

    savedPhrases(array) {
      return array.map((phrase, i) =>
      <li key={'phrase_' + i}>{phrase.phrase}</li>
      )
    }

  //to show phrases add the below to render, however the server will run nonstop as it keeps rendering over and over
      //{this.getSavedPhrases()}
  render() {
    return (
      <div>
      <br />
      {this.getSavedPhrases()}
      <h1 className="bg-primary text-white rounded heading">Saved Phrases</h1>
      <ul><h4>{this.savedPhrases(this.state.response)}</h4></ul>
      </div>
    );
  }
}

export default Profile;
