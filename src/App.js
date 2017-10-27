import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

const url = "https://protected-thicket-11517.herokuapp.com/api/phrases"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {phrasesReceived: ""}
    this.getPhrases = this.getPhrases.bind(this)
  }

  getPhrases() {
     axios.get(url, { crossdomain: true })
      .then((response) => {
        alert(response)
        this.setState({phrasesReceieved: JSON.stringify(response)})
      })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    return (
      <div className="App">
      <button
      onClick={this.getPhrases}
      style={{marginTop: '25vh'}}
      >
      Get Phrases
      </button>
      <p>{this.state.phrasesReceived}</p>
      <p>Fake Text</p>
      </div>
    );
  }
}

export default App;
