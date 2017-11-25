import React, { Component } from 'react';
import axios from 'axios'
import URL from '../url'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //dbPhrases: []
    }
    //this.getSavedPhrases = this.getSavedPhrases.bind(this);
    //this.addToState      = this.addToState.bind(this);
    this.removeFromState = this.removeFromState.bind(this);
    this.handleDelete    = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.getSavedPhrases()
  }

  //getSavedPhrases() {
    //let config = {
      //headers: {
        //'Authorization': 'Bearer ' + this.props.jwt
      //}
    //}
    //axios.get(URL() + 'api/phrases',
      //config
    //)
      //.then((response) => {
        //response.data.map((phrase) =>
          //this.addToState(phrase)
        //)
      //})
  //}

  //addToState(phrase) {
    //this.setState({
      //dbPhrases: [...this.state.dbPhrases, {language: phrase.language, phrase: phrase.phrase}]
    //})
  //}

  removeFromState(phrase) {
    this.setState({dbPhrases: this.state.dbPhrases.filter(function(deletedPhrase) {
      return phrase !== deletedPhrase
    })}
    )}

  //this isn't passing phrase along and I have no idea why. WHYYYYYYYYYY
  //if I don't make it an arrow function it works fine but then it auto runs and deletes everything
  handleDelete = (phrase) => {
    //it doesn't know what phrase is
    this.props.deletePhrase(phrase.phrase)
    this.props.removeFromState(phrase)
  }

  render() {
    let list = this.props.dbPhrases.map((phrase, index) =>
      <tr key={index}><td className="btn-sm languageButtonColor text-dark btn text-left">
      {phrase.language}:</td><td><h4>{phrase.phrase}</h4></td>
      <td><a className="btn text-dark" href={this.props.format(phrase)}
      className="btn mainButtonColor btn-sm text-dark text-right" download>Download</a></td>
      <td><button data={phrase} onClick={this.handleDelete} >Delete</button></td>
      </tr>)
    return (
      <div>
      <br />
      <h1 className="bannerColor text-white rounded heading">Saved Phrases</h1>
      <table width="100%">
      <tbody>
      {list}
      </tbody>
      </table>
      </div>
    );
  }
}


export default Profile;
