import React, { Component } from 'react';
import axios from 'axios'

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: 'Please enter text to covert to audio',
      language: 'Choose Language',
      api: "",
      languageHash: {
        Catalan: "ca-es",
        Chinese: "zh-cn",
        Danish: "da-dk",
        Dutch: "nl-nl",
        English: "en-us",
        Finnish: "fi-fi",
        French: "fr-fr",
        German: "de-de",
        Italian: "it-it",
        Japanese: "ja-jp",
        Korean: "ko-kr",
        Norwegian: "nb-no",
        Polish: "pl-pl",
        Portuguese: "pt-br",
        Russian: "ru-ru",
        Spanish:  "es-mx",
        Swedish: "sv-se"
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
    let language = this.state.languageHash[this.state.language]
    axios.get('https://api.voicerss.org/?key=' + this.state.api + '&hl=' + language + '&src=' + this.state.text)
      .then((data) => {
        alert('it works!')
        this.createPhrase()
      })
      .catch((error) => {
        alert('it doesnt work!')
      })
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
      <label>
      Phrase:
      </label>
      <textarea value={this.state.phrase} onChange={this.handleChange}/>
      <label>
      Language:
      </label>
      <select value={this.state.language} onChange={this.handleLanguageChange}>
      <option value="Choose Language">Choose Language</option>
      <option value="English">English</option>
      <option value="Spanish">Spanish</option>
      <option value="Italian">Italian</option>
      <option value="Chinese">Chinese</option>
      </select>
      <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default Form;


