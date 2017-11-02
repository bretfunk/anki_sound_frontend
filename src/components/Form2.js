import React, { Component } from 'react';
import axios from 'axios'
//import VoiceRSS from '../voicerss-tts.min.js'
//var FileSaver = require('file-saver');
//import FileSaver from 'file-saver'
//import fileDownload from 'react-file-download'
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: 'Please enter text to covert to audio',
      language: 'Choose Language',
      api: "6cb15da6cea04e2b85024d5b5351046c",
      //languageHash: {
        //Catalan: "ca-es",
        //Chinese: "zh-cn",
        //Danish: "da-dk",
        //Dutch: "nl-nl",
        //English: "en-us",
        //Finnish: "fi-fi",
        //French: "fr-fr",
        //German: "de-de",
        //Italian: "it-it",
        //Japanese: "ja-jp",
        //Korean: "ko-kr",
        //Norwegian: "nb-no",
        //Polish: "pl-pl",
        //Portuguese: "pt-br",
        //Russian: "ru-ru",
        //Spanish:  "es-mx",
        //Swedish: "sv-se"
      //}
      languageHash: {
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
        Engish: "en",
        Esperanto: "eo",
        Finnish: "fi",
        French: "fr",
        German: "de",
        Greek: "el",
        Hindi: "hi",
        Hungranian: "hu",
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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFile = this.getFile.bind(this);
  }

  handleChange(event) {
    this.setState({phrase: event.target.value});
  }

  handleLanguageChange(event) {
    this.setState({language: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("\"" + this.state.phrase + "\" was submitted in " + this.state.language);
    this.getFile()
  }

  getFile() {
    //axios.get('http:soundoftext.com/static/sounds/en/test.mp3')
    axios.get('http://localhost:4000/download')
    .then((data) => {
      debugger
      //fileDownload(data, 'filename.csv');

    })
    .catch((error) => {
      alert(error)
    })
    //let language = this.state.languageHash[this.state.language]
            //VoiceRSS.speech({
                          //key: this.state.api,
                          //src: this.state.phrase,
                          //hl: language,
                          //r: 0,
                          //c: 'mp3',
                          //f: '44khz_16bit_stereo',
                          //ssml: false
                      //});
    //axios.get('https://api.voicerss.org/?key=' + this.state.api + '&c=MP3&hl=' + language + '&src=' + this.state.phrase)
    //axios.get('http://api.voicerss.org/?key=6cb15da6cea04e2b85024d5b5351046c&hl=en-us&src=Hello, world!')
      //.then((data) => {
      //})
      //.catch((error) => {
        //alert(error)
      //})
  }

  //probably want to remove this from getFile so the user only saves the files they want, not all files
  createPhrase() {
    const phrase = this.state.phrase
    const language = this.state.language
    //need to figure out user_id
    //gives 500 error code but still adds to database
    let data = { phrase: phrase, language: language, user_id: 1 }
    //axios.post("https://protected-thicket-11517.herokuapp.com/api/user_token",
    axios.post('http://localhost:4000/api/phrases',
      data
    )
      .then((response) => {
        alert('phrase created!')
      })
      .catch((error) => {
        alert(error)
      })
    }


  render() {
    return (
      <div>
      <h1>Form</h1>
      <form onSubmit={this.handleSubmit}>
      <h1> Phrase:</h1>
      <br />
      <textarea value={this.state.phrase} onChange={this.handleChange}/>
      <br />
      <h1> Language: </h1>
      <br />
      <select value={this.state.language} onChange={this.handleLanguageChange}>
      <option value="Choose Language">Choose Language</option>
      <option value="English">English</option>
      <option value="Spanish">Spanish</option>
      <option value="Italian">Italian</option>
      <option value="Chinese">Chinese</option>
      </select>
      <br />
      <br />
      <input className="btn btn-primary" type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default Form;


