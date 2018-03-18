import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form'
import StorageURL from '../storageUrl';
import LambdaURL from '../lambdaUrl';
import URL from '../url';
import { connect } from 'react-redux';
import {
  SUBMIT_PHRASE,
  ADD_TO_STATE

} from '../store/constants/action-types';
import {
  submitPhrase,
  addToState
} from '../store/actions/index'

class Body extends Component {
  constructor(props) {
    super(props);

    this.createPhrase    = this.createPhrase.bind(this)
    this.addToDb = this.addToDb.bind(this)
    this.createFile = this.createFile.bind(this)
    this.format = this.format.bind(this)
    this.formatFileName = this.formatFileName.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  play = () => {
    this.audio.play();
  }

  //formatPhrase(event) {
  //let data = event.target.parentElement.parentElement.innerText.replace('Download', '')
  //let newData = data.replace('Delete', '').split(':')
  //let language = newData[0]
  //let phrase = newData[1].replace(language, '').trim()
  //let fullPhrase = {language: language, phrase: phrase}
  //return fullPhrase
  //}

  onSubmit(phrase){
    this.createFile(phrase)
    this.props.submitPhrase(phrase)
  }

  addToDb(data) {
    let parsed = data.currentTarget.parentElement.parentElement.innerText
    let newParsed = parsed.replace('Download', '').replace('Save to Profile', '').split(':')
    let language = newParsed[0]
    let phrase = newParsed[1].replace(language, '').trim()
    let fullPhrase = {phrase: phrase, language: language}
    this.createPhrase(fullPhrase)
    //this.addToState(fullPhrase)
    this.props.addToState(fullPhrase)
    this.createFile(fullPhrase)
  }

  createPhrase(phrase) {
    let data = {
      phrase: phrase.phrase,
      language: phrase.language,
      user_id: this.props.userId
    }
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

  //adds file to backend db
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

  formatFileName(phrase) {
    return phrase.toString().trim().split(' ').join('_')
  }

  format(phrase) {
    let language = this.props.languageHash[phrase.language]
    let fileName = this.formatFileName(phrase.phrase)
    let link = StorageURL() + `${language}/${fileName}.mp3`
    return link
  }

  render() {
    let button;
    if (this.props.loggedIn) {
      button = <td><button
          className="btn secondaryButtonColor btn-sm text-dark"
          onClick={this.addToDb}
        >Save to Profile</button></td>
    }  else {
      button = ""
    }

    let list;
    if (this.props.savedPhrases) {
      list = this.props.savedPhrases.map((phrase, index) =>
        <tr key={index}>
          <td className= "btn-sm languageButtonColor text-dark btn text-left">{phrase.language}:</td>
          <td><h4>{phrase.phrase}</h4></td>
          <td><a className="btn secondaryButtonColor" href={this.format(phrase)}
              className="btn mainButtonColor text-dark btn-sm text-right" download>Download </a></td>
          <td><audio ref={(audio) => { this.audio = audio; }} src={this.format(phrase)} type="audio/mp3"> </audio></td>
          {button}
        </tr>)
    } else {
      list = ""
    }

    //this is the play button but it only works when one word is present
    //<td><button onClick={this.play}>Play</button></td>
    return (
      <div className="mainWindowColor">
        <br />
        <h1 className="bannerColor text-white rounded heading">Phrase to Convert</h1>
        <h5><Form onSubmit={this.onSubmit}/></h5>
        <br />
        <h1 className="bannerColor text-white rounded heading">Submitted Phrases</h1>
        <table width="100%">
          <tbody>
            {list}
          </tbody>
        </table>
      </div>
    );
  }
}

//cant read userId and jwt but can read languageHash
//they are wiped upon login, no idea why
//maybe learn about debugging redux and react
function mapStateToProps(state) {
  return {
    loggedIn: state.heading.loggedIn,
    savedPhrases: state.phrase.savedPhrases,
    dbPhrases: state.phrase.dbPhrases,
    languageHash: state.random.languageHash,
    userId: state.login.userId,
    jwt: state.login.jwt
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //changeLoggedIn: () => dispatch({ type: 'CHANGE_LOGGED_IN' }),
    submitPhrase: (phrase) => dispatch({ type: SUBMIT_PHRASE, phrase }),
    addToState: (phrase) => dispatch({ type: ADD_TO_STATE, phrase })
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (Body);

//export default Body;


