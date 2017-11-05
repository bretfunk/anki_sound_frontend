import React, { Component } from 'react';
import Form from './Form'
import API from '../api'

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

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: []
    }
    this.savePhrase = this.savePhrase.bind(this);
  }


  savePhrase = (phrase) => {
    this.props.addToDb(phrase)
  }

  //format(phrase) {
    //let language = languageHash[phrase.language]
    //let newPhrase = phrase.phrase.toString().trim().split(' ').join('_')
    //let link = `http://soundoftext.com/static/sounds/${language}/${newPhrase}.mp3`
    //return link
    //}

  handleSubmit = (phrase) => {
    this.setState({
      collection: [...this.state.collection, {language: phrase.language, phrase: phrase.phrase}]
    })
  }

  render() {

  let button;
    if (this.props.loggedIn) {
      button = <button className="btn secondaryButtonColor btn-sm text-dark"
      onClick={this.savePhrase}>Save to Profile</button>
    }  else {
      button = ""
    }

    let list = this.state.collection.map((phrase, i ) => <li key={phrase.phrase + i}><h4><span className=
      "btn-sm languageButtonColor text-dark btn text-left">{phrase.language}:
    </span>&nbsp;&nbsp;{phrase.phrase}&nbsp;&nbsp;<a className="btn secondaryButtonColor"
    href={this.props.format(phrase)} className="btn mainButtonColor text-dark btn-sm text-right">Download
      </a>&nbsp;&nbsp;{button}</h4></li>)

    return (
      <div className="mainWindowColor">
      <br />
      <h1 className="bannerColor text-white rounded heading">Phrase to Convert</h1>
      <h5><Form onSubmit={this.handleSubmit}/></h5>
      <br />
      <h1 className="bannerColor text-white rounded heading">Submitted Phrases</h1>
      <ul className="text-left">
      {list}
      </ul>
      </div>
  );
  }
}

export default Body;


