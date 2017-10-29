import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/navbar';
import Form from './components/form';
import Body from './components/body';

const url = "https://protected-thicket-11517.herokuapp.com/api/phrases"

class App extends Component {
  constructor(props) {
    super(props)
    this.getPhrases = this.getPhrases.bind(this)
  }


  getPhrases() {
     axios.get(url, { crossdomain: true })
      .then((response) => {
        this.setState({phrasesReceived: JSON.stringify(response.data)})
      })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <div>
      <div className="App-header">
      <Navbar />
      </div>
      <div className="App">
      <Form />
      <Body />
      <button
      onClick={this.getPhrases}
      >
      Get Phrases
      </button>
      </div>
      </div>
    );
  }
}

export default App;
