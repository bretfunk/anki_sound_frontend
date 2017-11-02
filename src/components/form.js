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

    render() {
      return(
        <form onSubmit={this.handleSubmit}>
        <select value={this.state.language} onChange={this.handleLanguageChange}>
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="Italian">Italian</option>
        <option value="Chinese">Chinese</option>
        </select>
        <input type='text' onChange={this.handlePhraseChange} value={this.state.phrase}/>
        <button type='submit' onSubmit={this.handleSubmit} value={this.state}>Submit</button>
        </form>
      )
    }
}

export default Form;
