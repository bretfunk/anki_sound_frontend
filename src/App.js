import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import MainWindow from './components/MainWindow';
import SideWindow from './components/SideWindow';
import Login from './components/Login';
import NewUser from './components/NewUser';
import axios from 'axios'

//const url = "https://protected-thicket-11517.herokuapp.com/api/phrases"
//

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tryingToLogin: false,
      tryingToCreateUser: false,
      loggedIn: true,
      jwt: '',
      userId: '',
    }

    this.loggingIn = this.loggingIn.bind(this)
    this.creatingUser = this.creatingUser.bind(this)
  }


  loggingIn() {
    this.setState({tryingToLogin: true})
  }

  creatingUser() {
    this.setState({tryingToCreateUser: true})
  }

  getUserId() {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.fakeJWT
      }
    }
    axios.get('http://localhost:4000/api/user',
      config
    )
      .then((response) => {
        debugger
        this.setState({id: response.data.id})
        alert(this.state.id)
        //debugger
      })
  }

  render() {
  let orientation;
  if (this.state.loggedIn) {
      orientation = <div className="row text-center"> <div className="col-7">
      <MainWindow loggedIn={this.state.loggedIn}/> </div> <div className="col-5">
      <SideWindow /> </div> </div>
  } else {
      orientation = <div className="text-center col-12"><MainWindow loggedIn={this.state.loggedIn}/> </div>
  }

  let logging;
    if (this.state.tryingToLogin) {
      logging = <div className="row"><br /><br /><Login /></div>
    }  else {
      logging = ""
    }

  let createUser;
    if (this.state.tryingToCreateUser) {
      createUser = <div className="row"><br /><br /><NewUser /></div>
     } else {
       createUser = ""
     }

    return (
      <div className="container-fluid">
      <Header loggingIn={this.loggingIn} creatingUser={this.creatingUser}/>
      {logging}
      {createUser}
      {orientation}
      </div>
    )
  }
}

export default App;
