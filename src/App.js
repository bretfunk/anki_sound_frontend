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
      userId: '',
      savedPhrases: [],
      dbPhrases: []
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
    this.createFile     = this.createFile.bind(this)
    this.play           = this.play.bind(this)
    this.formatFileName = this.formatFileName.bind(this)
    this.deletePhrase   = this.deletePhrase.bind(this)
    this.savePhrase     = this.savePhrase.bind(this)
    this.getSavedPhrases = this.getSavedPhrases.bind(this);
    this.addToState      = this.addToState.bind(this);
  }

  //remove the prop of jwt now that I can call it directly
  getSavedPhrases() {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.jwt
      }
    }
    axios.get(URL() + 'api/phrases',
      config
    )
      .then((response) => {
        response.data.map((phrase) =>
          this.addToState(phrase)
        )
      })
  }

  addToState(phrase) {
    this.setState({
      dbPhrases: [...this.state.dbPhrases, {language: phrase.language, phrase: phrase.phrase}]
    })
  }


  savePhrase = (phrase) => {
    this.props.addToDb(phrase)
  }

  submitPhrase = (phrase) => {
    this.setState({
      savedPhrases: [...this.state.savedPhrases, {language: phrase.language, phrase: phrase.phrase}]
    })
    this.createFile(phrase)
  }

  savePhrase = (phrase) => {
    this.addToDb(phrase)
  }

  play = () => {
    this.audio.play();
  }

  createFile(rawPhrase) {
    let phrase = rawPhrase.phrase
    let language = languageHash[rawPhrase.language]
    let fileName = this.formatFileName(phrase)
    axios.get(URL() + `audio?phrase=${phrase}&language=${language}&file_name=${fileName}`
    )
      .then((response) => {
        debugger
      })
  }

  formatFileName(phrase) {
    return phrase.toString().trim().split(' ').join('_')
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

  //this works except phrase doesn't come through...so it doesn't work
  deletePhrase(phrase) {
    axios.delete(URL() + `api/phrases?phrase=${phrase.phrase}&user_id=${this.state.userId}`)
      .then((response) => {
        console.log(response + ' deleted')
      })
      .catch((error) => {
        console.log(error)
      })
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
    let fileName = this.formatFileName(phrase.phrase)
    let link = URL() + `${language}/${fileName}.mp3`
    return link
    }

  //clean up this mess
  render() {
  let orientation;
  if (this.state.loggedIn) {
      orientation = <div className="row text-center"> <div className="col-7">
      <MainWindow savePhrase={this.savePhrase} savedPhrases={this.state.savedPhrases} submitPhrase={this.submitPhrase} play={this.play} createFile={this.createFile} format={this.format} addToDb={this.addToDb} loggedIn={this.state.loggedIn} audio={this.audio} />
      </div> <div className="col-5">
      <SideWindow dbPhrases={this.state.dbPhrases} getSavedPhrases={this.getSavedPhrases} deletePhrase={this.deletePhrase} format={this.format} jwt={this.state.jwt}/> </div> </div>
  } else {
      orientation = <div className="text-center col-12"><MainWindow format={this.format}
    audio={this.audio} loggedIn={this.state.loggedIn} savedPhrases={this.state.savedPhrases} submitPhrase={this.submitPhrase} createFile={this.createFile} play={this.play} /> </div>
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
      {orientation}
      </div>
    )
  }
}

export default App;
