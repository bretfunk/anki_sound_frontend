import React, { Component } from 'react';
import Form from './Form'
import API from '../api'

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

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: []
    }
    this.format= this.format.bind(this);
    this.savePhrase = this.savePhrase.bind(this);
  }


  savePhrase(phrase) {
    //alert('save phrase')
  }

  format(phrase) {
    let language = languageHash[phrase.language]
    let newPhrase = phrase.phrase.toString().trim().split(' ').join('_')
    let link = `http://soundoftext.com/static/sounds/${language}/${newPhrase}.mp3`
    return link
    }

  handleSubmit = (phrase) => {
    this.setState({
      collection: [...this.state.collection, {language: phrase.language, phrase: phrase.phrase}]
    })
  }

  render() {
    let list = this.state.collection.map(phrase => <li><h4>{phrase.language}:
    "{phrase.phrase}"&nbsp;&nbsp;<a className="btn btn-primary
    " href={this.format(phrase)} className="btn btn-primary btn-sm bg-dark text-white">Download
      </a>&nbsp;&nbsp;<button className="btn btn-primary btn-sm"
    onClick={this.savePhrase(phrase)}>Save to Profile</button></h4></li>)
    //let list = this.state.collection.map(phrase => <li>{phrase.language}: "{phrase.phrase}"<button onClick={this.format(phrase)}>Save</button></li>)
    //let button = <a href=`http://soundoftext.com/static/sounds/en/test.mp3` target="_blank">Download</a>
    //let button = (this.props.loggedIn) ? button = <button onClick={this.formatPhrase(phrase)}>Save</button> : button = ''
    return (
      <div>
      <br />
      <h1>Phrase to Convert</h1>
      <h5><Form onSubmit={this.handleSubmit}/></h5>
      <br />
      <h1>Submitted Phrases</h1>
      <ul>
      {list}
      </ul>
      </div>
  );
  }
}

export default Body;


