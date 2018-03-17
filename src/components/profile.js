import React, { Component } from 'react';
import axios from 'axios';
import URL from '../url';
import { connect } from 'react-redux';
import {
  ADD_TO_STATE
} from '../store/constants/action-types'
import {
  addToState
} from '../store/actions/index'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleDelete    = this.handleDelete.bind(this);
    this.formatPhrase    = this.formatPhrase.bind(this);
  }

  componentDidMount() {
    this.getSavedPhrases()
  }

  getSavedPhrases() {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.props.jwt
      }
    }
    axios.get(URL() + 'api/phrases',
      config
    )
      .then((response) => {
        response.data.map((phrase) =>
          this.props.addToState(phrase)
        )
      })
  }

  formatPhrase(event) {
    let data = event.target.parentElement.parentElement.innerText.replace('Download', '')
    let newData = data.replace('Delete', '').split(':')
    let language = newData[0]
    let phrase = newData[1].replace(language, '').trim()
    let fullPhrase = {language: language, phrase: phrase}
    return fullPhrase
  }

  handleDelete = (event) => {
    this.props.removeFromDb(this.formatPhrase(event))
  }

  render() {
    let list = this.props.dbPhrases.map((phrase, index) =>
      <tr key={index}><td className="btn-sm languageButtonColor text-dark btn text-left">
          {phrase.language}:</td><td><h4>{phrase.phrase}</h4></td>
        <td><a className="btn text-dark" href={this.props.format(phrase)}
            className="btn secondaryButtonColor btn-sm text-dark text-right" download>Download</a></td>
        <td><button className="btn mainButtonColor btn-sm text-dark text-right"
            onClick={this.handleDelete} >Delete</button></td>
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

function mapStateToProps(state) {
  return {
    dbPhrases: state.phrase.dbPhrases,
    jwt: state.login.jwt
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToState: (phrase) => dispatch({ type: ADD_TO_STATE, phrase })
    //changeLoggedIn: () => dispatch({ type: 'CHANGE_LOGGED_IN' }),
    //submitPhrase: (phrase) => dispatch({ type: SUBMIT_PHRASE, phrase })
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (Profile);

//export default Profile;
