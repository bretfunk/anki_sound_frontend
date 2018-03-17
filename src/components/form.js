import React, { Component } from 'react';

class Form extends Component {
  constructor() {
    super()
    this.state={
      phrase: '',
      language: 'English'
    }
  }

  handlePhraseChange = (event) => {
    this.setState({
      phrase: event.target.value
    })
  }

  handleLanguageChange = (event) => {
    this.setState({
      language: event.target.value
    })
  }
  handleSubmit=(event)=>{
    event.preventDefault()
    this.props.onSubmit(this.state)
    this.setState({
      phrase: ''
    })
  }

  //TODO there has got to be a better way to do this with map or something
  render() {
    let options =
      <select value={this.state.language} onChange={this.handleLanguageChange}>
        <option value="Afrikaans">Afrikaans</option>
        <option value="Albanian">Albanian</option>
        <option value="Arabic">Arabic</option>
        <option value="Armenian">Armenian</option>
        <option value="Bosnian">Bosnian</option>
        <option value="Catalan">Catalan</option>
        <option value="Chinese">Chinese</option>
        <option value="Croatian">Croatian</option>
        <option value="Czech">Czech</option>
        <option value="Danish">Danish</option>
        <option value="Dutch">Dutch</option>
        <option value="English">English</option>
        <option value="Esperanto">Esperanto</option>
        <option value="Finnish">Finnish</option>
        <option value="French">French</option>
        <option value="German">German</option>
        <option value="Greek">Greek</option>
        <option value="Hindi">Hindi</option>
        <option value="Hungarian">Hungarian</option>
        <option value="Icelandic">Icelandic</option>
        <option value="Indonesian">Indonesian</option>
        <option value="Italian">Italian</option>
        <option value="Japanese">Japanese</option>
        <option value="Korean">Korean</option>
        <option value="Latin">Latin</option>
        <option value="Norwegian">Norwegian</option>
        <option value="Polish">Polish</option>
        <option value="Portugese">Portugese</option>
        <option value="Romanian">Romanian</option>
        <option value="Russian">Russian</option>
        <option value="Serbian">Serbian</option>
        <option value="Slovak">Slovak</option>
        <option value="Spanish">Spanish</option>
        <option value="Swahili">Swahili</option>
        <option value="Tamil">Tamil</option>
        <option value="Thai">Thai</option>
        <option value="Turkish">Turkish</option>
        <option value="Vietnamese">Vietnamese</option>
      </select>

      return(
        <form onSubmit={this.handleSubmit}>
          {options}
          <input
            type='text'
            onChange={this.handlePhraseChange}
            value={this.state.phrase}/>
          <button
            className="btn secondaryButtonColor btn-sm"type='submit'
            onSubmit={this.handleSubmit}
            value={this.state}>Submit</button>
        </form>
      )
  }
}

export default Form;
