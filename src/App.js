import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar';
import MainWindow from './components/MainWindow';
import SideWindow from './components/SideWindow';

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
      <div className="App-Navbar">
      <Navbar />
      </div>
      <div>
      <table width="100%">
      <tbody>
      <tr>
      <td width="70%" className="App-MainWindow">
      <MainWindow />
      </td>
      <td width="30%" className="App-SideWindow">
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
