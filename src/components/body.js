import React, { Component } from 'react';
//import Phrases from './Phrases'
import Form from './Form'

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: []
    }
    this.getPhrase = this.getPhrase.bind(this);
  }
  formatRequest() {
    alert('request formatted!')
    }

  handleSubmit = (phrase) => {
    this.setState({
      collection: [...this.state.collection, {language: phrase.language, phrase: phrase.phrase}]
    })
    .replace( /\W/g , '')
  }

  render() {
    let button = (this.props.loggedIn) ? button = <button onClick={this.formatRequest}>Save</button> : button = ''
    let list = this.state.collection.map(phrase => <li>{phrase.language}: "{phrase.phrase}"{button}</li>)
    return (
      <div>
      <h1>Form</h1>
      <h5>
      <Form onSubmit={this.handleSubmit}/>
      </h5>
      <h1>Phrases</h1>
      <ul>
      {list}
      </ul>
      </div>
  );
  }
}

export default Body;


