import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import MainWindow from './components/MainWindow';
import SideWindow from './components/SideWindow';
import Login from './components/Login';
import NewUser from './components/NewUser';
import axios from 'axios';
import URL from './url';
import StorageURL from './storageUrl';
import LambdaURL from './lambdaUrl';
import { connect } from 'react-redux';
import {
  CHANGE_LOGGED_IN
  //CHANGE_TRYING_TO_LOGIN,
  //CHANGE_TRYING_TO_CREATE_USER
} from './store/constants/action-types';
import {
  changeLoggedIn
  //loggingIn,
  //creatingUser
} from './store/actions/index';

//const languageHash = {
  //Afrikaans: "af",
  //Albanian: "sq",
  //Arabic: "ar",
  //Armenian: "hy",
  //Bosnian: "bs",
  //Catalan: "ca",
  //Chinese: "zh-CN",
  //Croatian: "hr",
  //Czech: "cs",
  //Danish: "da",
  //Dutch: "nl",
  //English: "en",
  //Esperanto: "eo",
  //Finnish: "fi",
  //French: "fr",
  //German: "de",
  //Greek: "el",
  //Hindi: "hi",
  //Hungarian: "hu",
  //Icelandic: "is",
  //Indonesian: "id",
  //Italian: "it",
  //Japanese: "ja",
  //Korean: "ko",
  //Latin: "la",
  //Norwegian: "no",
  //Polish: "pl",
  //Portugese: "pt",
  //Romanian: "ro",
  //Russian: "ru",
  //Serbian: "sr",
  //Slovak: "sk",
  //Spanish: "es",
  //Swahili: "sw",
  //Swedish: "sv",
  //Tamil: "ta",
  //Thai: "th",
  //Turkish: "tr",
  //Vietnamese: "vi",
//}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //tryingToLogin: false,
      //tryingToCreateUser: false,
      //loggedIn: false,
      jwt: '',
      userId: '',
      savedPhrases: [],
      dbPhrases: []
    }

    //this.loggingIn       = this.loggingIn.bind(this)
    //this.creatingUser    = this.creatingUser.bind(this)
    //this.changeLoggedIn  = this.changeLoggedIn.bind(this)
    this.changeJwt       = this.changeJwt.bind(this)
    this.getUserId       = this.getUserId.bind(this)
    this.addToDb         = this.addToDb.bind(this)
    this.createPhrase    = this.createPhrase.bind(this)
    this.format          = this.format.bind(this)
    this.logOut          = this.logOut.bind(this)
    this.createFile      = this.createFile.bind(this)
    this.play            = this.play.bind(this)
    this.formatFileName  = this.formatFileName.bind(this)
    this.deletePhrase    = this.deletePhrase.bind(this)
    this.savePhrase      = this.savePhrase.bind(this)
    this.getSavedPhrases = this.getSavedPhrases.bind(this);
    this.addToState      = this.addToState.bind(this);
    this.removeFromState = this.removeFromState.bind(this);
    this.removeFromDb    = this.removeFromDb.bind(this);
  }

  //get saved phrases, runs after logging in
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

  //adds a new saved phrase going to the db to also go to the collection in state
  addToState(phrase) {
    this.setState({
      dbPhrases: [...this.state.dbPhrases, {language: phrase.language, phrase: phrase.phrase}]
    })
    this.createFile(phrase)
  }

  //removes a saved phrase from the collection in state after being removed from db
  //currently cannot compare 'objects' against each other, just using the phrase but not ideal
  removeFromState(deletedPhrase) {
    this.setState({dbPhrases: this.state.dbPhrases.filter(function(phrase) {
      return phrase.phrase !== deletedPhrase.phrase
    })}
    )}

  //goes to addToDb for formatting and insertion into the db
  savePhrase = (phrase) => {
    this.addToDb(phrase)
  }

  //this adds a phrase to the collection after being submitted (not saved)
  submitPhrase = (phrase) => {
    this.setState({
      savedPhrases: [...this.state.savedPhrases, {language: phrase.language, phrase: phrase.phrase}]
    })
    this.createFile(phrase)
  }

  //this is to play files, not just download them, a work in progress, also in the componet
  play = () => {
    this.audio.play();
  }

  //creates file in the backend upon submittal, there it remains
  createFile(rawPhrase) {
    let phrase = rawPhrase.phrase
    let language = this.props.languageHash[rawPhrase.language]
    let fileName = this.formatFileName(phrase)
    axios.get(LambdaURL() + `?phrase=${phrase}&language=${language}&file_name=${fileName}`
      //axios.get(URL() + `audio?phrase=${phrase}&language=${language}&file_name=${fileName}`
    )
      .then((response) => {
      })
  }

  //need to format file names to save and retrieve them, probably need to downcase to save space
  formatFileName(phrase) {
    return phrase.toString().trim().split(' ').join('_')
  }


  //everytime a user clicks the login button it changes the state
  //loggingIn() {
    //let change;
    //(this.props.tryingToLogin) ? change = false : change = true
    //this.setState({ tryingToLogin: change })
  //}

  //everytime a user clicks the create user button it changes the state
  //creatingUser() {
    //let change;
    //(this.state.tryingToCreateUser) ? change = false : change = true
    //this.setState({ tryingToCreateUser: change })
  //}

  //if a user is logged in or not
  //changeLoggedIn() {
    //this.props.changeLoggedIn()
    //changeLoggedIn: () => dispatch({ type: 'CHANGE_LOGGED_IN' })
    //let change;
    //(this.state.loggedIn) ? change = false : change = true
    //this.setState({ loggedIn: change })
  //}

  //log out the user, also wipes data
  logOut() {
    this.props.changeLoggedIn()
    //this.setState({loggedIn: false})
    this.setState({jwt: ''})
    this.setState({userId: ''})
    this.setState({ savedPhrases: [] })
    this.setState({ dbPhrases: [] })
  }

  //changes the JSON web token, this is how the frontend and backend talk to each other
  changeJwt(jwt) {
    this.setState({jwt: jwt})
    this.getUserId(jwt)
  }

  //gets the user id so the backend can save the phrase to the correct user
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

  //this formats the phrase and adds it to the react collection and the backend db
  //this is done differently than the remove from db method, wasnt sure best react practices
  addToDb(data) {
    let parsed = data.currentTarget.parentElement.parentElement.innerText
    let newParsed = parsed.replace('Download', '').replace('Save to Profile', '').split(':')
    let language = newParsed[0]
    let phrase = newParsed[1].replace(language, '').trim()
    let fullPhrase = {phrase: phrase, language: language}
    this.createPhrase(fullPhrase)
    this.addToState(fullPhrase)
  }

  //as mentioned above, the formatting is done in the component upon removal, did both ways
  //but not sure which is react best practice
  removeFromDb(fullPhrase) {
    this.deletePhrase(fullPhrase)
    this.removeFromState(fullPhrase)
  }

  //deletes the phrase from the backend db
  deletePhrase(phrase) {
    axios.delete(URL() + `api/phrases?phrase=${phrase.phrase}&user_id=${this.state.userId}`)
      .then((response) => {
        console.log(response + ' deleted')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //creates the phrase in the db under the correct user
  createPhrase(phrase) {
    let data = { phrase: phrase.phrase, language: phrase.language, user_id: this.state.userId }
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

  //formats the phrase to be saved in the backend db
  //changed to AmazonAWS
  format(phrase) {
    let language = this.props.languageHash[phrase.language]
    let fileName = this.formatFileName(phrase.phrase)
    let link = StorageURL() + `${language}/${fileName}.mp3`
    return link
  }

  //the render section is messy but I couldnt break it up (like the buttons) without getting errors
  //I also think there is a better way to pass down props without it being so messy
  render() {
    let orientation;
    if (this.props.loggedIn) {
      orientation = <div className="row text-center"> <div className="col-7">
          <MainWindow
            savePhrase={this.savePhrase}
            savedPhrases={this.state.savedPhrases}
            submitPhrase={this.submitPhrase}
            play={this.play}
            format={this.format}
            addToDb={this.addToDb}
            audio={this.audio} />
          </div> <div className="col-5">
          <SideWindow
            removeFromDb={this.removeFromDb}
            dbPhrases={this.state.dbPhrases}
            getSavedPhrases={this.getSavedPhrases}
            format={this.format} /> </div> </div>
    } else {
      orientation = <div className="text-center col-12">
        <MainWindow
          format={this.format}
          audio={this.audio}
          savedPhrases={this.state.savedPhrases}
          submitPhrase={this.submitPhrase}
          createFile={this.createFile}
          play={this.play} /> </div>
    }

    let logging;
    if (this.props.tryingToLogin) {
      logging = <div className="row"><br /><br /><Login changeJwt={this.changeJwt}
          /></div>
    }  else {
      logging = ""
    }

    let createUser;
    if (this.props.tryingToCreateUser) {
      createUser = <div className="row"><br /><br /><NewUser /></div>
    } else {
      createUser = ""
    }

    return (
      <div className="mainWindowColor container-fluid">
        <Header logOut={this.logOut}
          />
        {logging}
        {createUser}
        {orientation}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.heading.loggedIn,
    tryingToLogin: state.heading.tryingToLogin,
    tryingToCreateUser: state.heading.tryingToCreateUser,
    languageHash: state.random.languageHash
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeLoggedIn: () => dispatch({ type: CHANGE_LOGGED_IN })
    //loggingIn: () => dispatch({ type: CHANGE_TRYING_TO_LOGIN }),
    //creatingUser: () => dispatch({ type: CHANGE_TRYING_TO_CREATE_USER })
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (App);
//export default App;
