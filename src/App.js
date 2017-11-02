import React, { Component } from 'react';
//import 'bootstrap';
import './App.css';
//import axios from 'axios';
import Navbar from './components/Navbar';
import MainWindow from './components/MainWindow';
import SideWindow from './components/SideWindow';
import API from './api'

//const url = "https://protected-thicket-11517.herokuapp.com/api/phrases"
//
  //let loginButton;
  //if (loggedIn) {
      //loginButton = <LogoutButton />;
  //} else {
      //loginButton = <LoginButton />;
  //}
      //authorizedUser: false,
      //loggedIn: false,
      //showProfile: false

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: true
    }
    this.getPhrases = this.getPhrases.bind(this)
  }

  getPhrases() {
    API.testFunction()
  }


        //{loginButton}
  render() {
    return (
      <div className="container-fluid">
      <Navbar />
      <a href="http://soundoftext.com/static/sounds/en/test.mp3" target="_blank">Test</a>
      <div className="row text-center">
      <div className="col-8 App-MainWindow">
      <MainWindow loggedIn={this.state.loggedIn}/>
      </div>
      <div className="col-4 App-SideWindow">
      <SideWindow />
      </div>
      </div>
      </div>
    )
  }
}

export default App;
