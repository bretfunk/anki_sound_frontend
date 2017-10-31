import React, { Component } from 'react';
import axios from 'axios'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      fakeJWT: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDk0OTcyODksInN1YiI6NX0.IEF43BK1dsH6U3CCNOY0DgWeg11KXzrZ6E4cv5zSScM"
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
        debugger
      })
      .catch((error) => {
        alert(error)
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
      <h1>Profile</h1>
      <ul>{this.savedPhrases(this.state.response)}</ul>
      </div>
    );
  }
}

export default Profile;
