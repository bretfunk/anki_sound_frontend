import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import MainWindow from './components/MainWindow';
import SideWindow from './components/SideWindow';
import Login from './components/Login';
import NewUser from './components/NewUser';
import axios from 'axios';
import URL from './url';

const languageHash = {
  Afrikaans: "af",
  Albanian: "sq",
  Arabic: "ar",
  Armenian: "hy",
  Bosnian: "bs",
  Catalan: "ca",
  Chinese: "zh-CN",
  Croatian: "hr",
  Czech: "cs",
  Danish: "da",
  Dutch: "nl",
  English: "en",
  Esperanto: "eo",
  Finnish: "fi",
  French: "fr",
  German: "de",
  Greek: "el",
  Hindi: "hi",
  Hungarian: "hu",
  Icelandic: "is",
  Indonesian: "id",
  Italian: "it",
  Japanese: "ja",
  Korean: "ko",
  Latin: "la",
  Norwegian: "no",
  Polish: "pl",
  Portugese: "pt",
  Romanian: "ro",
  Russian: "ru",
  Serbian: "sr",
  Slovak: "sk",
  Spanish: "es",
  Swahili: "sw",
  Swedish: "sv",
  Tamil: "ta",
  Thai: "th",
  Turkish: "tr",
  Vietnamese: "vi",
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tryingToLogin: false,
      tryingToCreateUser: false,
      loggedIn: false,
      jwt: '',
      userId: ''
    }

    this.loggingIn      = this.loggingIn.bind(this)
    this.creatingUser   = this.creatingUser.bind(this)
    this.changeLoggedIn = this.changeLoggedIn.bind(this)
    this.changeJwt      = this.changeJwt.bind(this)
    this.getUserId      = this.getUserId.bind(this)
    this.addToDb        = this.addToDb.bind(this)
    this.createPhrase   = this.createPhrase.bind(this)
    this.format         = this.format.bind(this)
    this.logOut         = this.logOut.bind(this)
    this.tts            = this.tts.bind(this)
    this.play           = this.play.bind(this)
  }

  play = () => {
    this.audio.play();
  }

  tts() {
    axios.get(URL() + 'api/tts',
    )
      .then((response) => {
        debugger
      })
  }

  loggingIn() {
    let change;
    (this.state.tryingToLogin) ? change = false : change = true
    this.setState({ tryingToLogin: change })
  }

  creatingUser() {
    let change;
    (this.state.tryingToCreateUser) ? change = false : change = true
    this.setState({ tryingToCreateUser: change })
  }

  changeLoggedIn() {
    let change;
    (this.state.loggedIn) ? change = false : change = true
    this.setState({ loggedIn: change })
  }

  logOut() {
    this.setState({loggedIn: false})
    this.setState({jwt: ''})
    this.setState({userId: ''})
  }

  changeJwt(jwt) {
    this.setState({jwt: jwt})
    this.getUserId(jwt)
  }

  getUserId(jwt) {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    }
    axios.get(URL() + 'api/user',
      config
    )
      .then((response) => {
        this.setState({ userId: response.data.id })
      })
  }

  addToDb(data) {
    let parsed = data.currentTarget.parentElement.parentElement.parentElement.innerText.replace('Download', '')
    let newParsed = parsed.replace('Save to Profile', '').split(':')
    let language = newParsed[0]
    let phrase = newParsed[1].trim()
    this.createPhrase(phrase, language)
  }

  createPhrase(phrase, language) {
    let data = { phrase: phrase, language: language, user_id: this.state.userId }
    axios.post(URL() + 'api/phrases',
      data
    )
      .then((response) => {
        console.log(response + ' created')
      })
      .catch((error) => {
        console.log(error)
      })
    }

  format(phrase) {
    let language = languageHash[phrase.language]
    let newPhrase = phrase.phrase.toString().trim().split(' ').join('_')
    let link = `http://soundoftext.com/static/sounds/${language}/${newPhrase}.mp3`
    return link
    }

  render() {
  let orientation;
  if (this.state.loggedIn) {
      orientation = <div className="row text-center"> <div className="col-7">
      <MainWindow format={this.format} addToDb={this.addToDb} loggedIn={this.state.loggedIn}/>
      </div> <div className="col-5">
      <SideWindow format={this.format} jwt={this.state.jwt}/> </div> </div>
  } else {
      orientation = <div className="text-center col-12"><MainWindow format={this.format}
    loggedIn={this.state.loggedIn}/> </div>
  }

  let logging;
    if (this.state.tryingToLogin) {
      logging = <div className="row"><br /><br /><Login changeJwt={this.changeJwt}
      loggingIn={this.loggingIn} changeLoggedIn={this.changeLoggedIn} /></div>
    }  else {
      logging = ""
    }

  let createUser;
    if (this.state.tryingToCreateUser) {
      createUser = <div className="row"><br /><br /><NewUser creatingUser={this.creatingUser} /></div>
     } else {
       createUser = ""
     }

    return (
      <div className="mainWindowColor container-fluid">
      <Header logOut={this.logOut} loggedIn={this.state.loggedIn} loggingIn={this.loggingIn}
      creatingUser={this.creatingUser}/>
      {logging}
      {createUser}
      <button onClick={this.tts}>TTS</button>
      <a href="http://localhost:4000/weather.mp3" download>Download</a>
      <audio ref={(audio) => { this.audio = audio; }} src="http://localhost:4000/weather.mp3" type="audio/mp3"> </audio>
      <button onClick={this.play}>Play</button>
      {orientation}
      </div>
    )
  }
}

export default App;
