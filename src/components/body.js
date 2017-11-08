import React, { Component } from 'react';
import Form from './Form'

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

  handleSubmit = (phrase) => {
    this.setState({
      collection: [...this.state.collection, {language: phrase.language, phrase: phrase.phrase}]
    })
  }

  render() {

  let button;
    if (this.props.loggedIn) {
      button = <td><button className="btn secondaryButtonColor btn-sm text-dark"
      onClick={this.savePhrase}>Save to Profile</button></td>
    }  else {
      button = ""
    }

    let list = this.state.collection.map((phrase) =>
      <tr>
      <td className= "btn-sm languageButtonColor text-dark btn text-left">{phrase.language}:</td>
      <td><h4>{phrase.phrase}</h4></td>
      <td><a className="btn secondaryButtonColor" href={this.props.format(phrase)}
      className="btn mainButtonColor text-dark btn-sm text-right">Download </a></td>
        {button}
      </tr>)

    return (
      <div className="mainWindowColor">
      <br />
      <h1 className="bannerColor text-white rounded heading">Phrase to Convert</h1>
      <h5><Form onSubmit={this.handleSubmit}/></h5>
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

export default Body;


