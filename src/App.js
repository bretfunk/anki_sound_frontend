import React, { Component } from 'react';
//import 'bootstrap';
import './App.css';
//import axios from 'axios';
import Navbar from './components/Navbar';
import MainWindow from './components/MainWindow';
import SideWindow from './components/SideWindow';
import API from './api';
import Login from './components/Login';
import NewUser from './components/NewUser';

//const url = "https://protected-thicket-11517.herokuapp.com/api/phrases"
//
      //authorizedUser: false,
      //loggedIn: false,
      //showProfile: false

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tryingToLogin: false,
      loggedIn: false,
      jwt: ''
    }
    this.loggingIn = this.loggingIn.bind(this)
  }

  loggingIn() {
    this.setState({tryingToLogin: true})
    alert('logging in!')
  }


  render() {
  let orientation;
  if (this.state.loggedIn) {
      orientation = <div className="row text-center"> <div className="col-8 App-MainWindow"> <MainWindow loggedIn={this.state.loggedIn}/> </div> <div className="col-4 App-SideWindow"> <SideWindow /> </div> </div>
  } else {
      orientation = <div className="col12 App-MainWindow"><MainWindow loggedIn={this.state.loggedIn}/> </div>
  }

  let logging;
    if (this.state.tryingToLogin) {
      logging = <div className="row"> <Login /> <NewUser /></div>
    }  else {
      logging = ""
    }

    return (
      <div className="container-fluid">
      <Navbar loggingIn={this.loggingIn}/>
      {logging}
      {orientation}
      </div>
    )
  }
}

export default App;
