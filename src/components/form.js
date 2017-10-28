import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: 'Please enter text to covert to audio',
      language: 'Choose Language'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({phrase: event.target.value});
  }

  handleLanguageChange(event) {
    this.setState({language: event.target.value});
  }

  handleSubmit(event) {
    debugger
    alert("\"" + this.state.phrase + "\" was submitted in " + this.state.language);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <label>
      Phrase:
      <textarea value={this.state.phrase} onChange={this.handleChange}/>
      </label>
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
    );
  }
}
//class Form extends Component {
  //buttonClick() {
    //alert('button clicked!')
  //}

  //render() {
    //return (
      //<div>
      //<h1>Enter Phrase</h1>
      //<form>
      //<input type="textarea" name="phrase" value="test" />
      //<select>
        //<option value="English">English</option>
        //<option value="Spanish">Spanish</option>
        //<option value="Italian">Italian</option>
        //<option value="Chinese">Chinese</option>
      //</select>
      //<input type="submit" name="submit" onClick={() => alert("button pressed!")}/>
      //</form>
      //</div>
  //);

  //}
//}

export default Form;


