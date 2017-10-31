import React, { Component } from 'react';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrases: ['a', 'b', 'c']
    }
    this.getPhrase = this.getPhrase.bind(this);
  }
  getPhrase() {
    }

  render() {
    return (
      <div>
      <h1>Body</h1>
      </div>
  );
  }
}

export default Body;


