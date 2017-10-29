import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: ['a', 'b', 'c'],
      jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDkzOTgwNjAsInN1YiI6Mn0.dKn1zRanNvEYsBBNeVz0H9G7l-E-ugWuR1S0uVWQzDA",
    }
    this.getSavedPhrases = this.getSavedPhrases.bind(this);
    this.savedPhrases = this.savedPhrases.bind(this);
  }

  getSavedPhrases() {
    //alert('get saved phrases')
  }

    savedPhrases(array) {
      return array.map((phrase, i) =>
      <li key={'phrase_' + i}>{phrase}</li>
      )
    }

  render() {
    return (
      <div>
      {this.getSavedPhrases()}
      <h1>Profile</h1>
      <ul>{this.savedPhrases(this.state.saved)}</ul>
      <p>{this.state.saved}</p>
      </div>
    );
  }
}

export default Profile;
