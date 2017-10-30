import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/navbar';
import MainWindow from './components/mainWindow';
import SideWindow from './components/sideWindow';

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
      <table width="100%">
      <tbody>
      <tr>
      <td>
      <MainWindow />
      </td>
      <td width="30%">
      <SideWindow />
      <button
      onClick={this.getPhrases}
      >
      Get Phrases
      </button>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
    );
  }
}

export default App;
