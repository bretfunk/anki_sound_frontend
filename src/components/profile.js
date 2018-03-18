import React, { Component } from 'react';
import axios from 'axios';
import URL from '../url';
import { connect } from 'react-redux';
import {
  ADD_TO_STATE,
  REMOVE_FROM_STATE,
  RESET_STATE
} from '../store/constants/action-types'
//import {
  //addToState,
  //removeFromState,
  //resetState
//} from '../store/actions/index'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleDelete    = this.handleDelete.bind(this);
    this.formatPhrase    = this.formatPhrase.bind(this);
  }

  componentDidMount() {
    this.props.resetState()
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

  removeFromDb(phrase) {
    this.props.removeFromState(phrase)
    this.deletePhrase(phrase)
  }

  deletePhrase(phrase) {
    axios.delete(URL() + `api/phrases?phrase=${phrase.phrase}&user_id=${this.props.userId}`)
      .then((response) => {
        console.log(response + ' deleted')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleDelete = (event) => {
    event.preventDefault()
    this.removeFromDb(this.formatPhrase(event))
  }

  render() {
    let list;
    if (this.props.dbPhrases) {
      list = this.props.dbPhrases.map((phrase, index) =>
        <tr key={index}>
          <td className="btn-sm languageButtonColor text-dark btn text-left">
            {phrase.language}:
          </td>
          <td>
            <h4>{phrase.phrase}</h4>
          </td>
          <td>
            <a
              href={this.props.format(phrase)}
              className="btn secondaryButtonColor btn-sm text-dark text-right"
              download>Download</a>
          </td>
          <td>
            <button
              className="btn mainButtonColor btn-sm text-dark text-right"
              onClick={this.handleDelete}
            >
              Delete
            </button>
          </td>
        </tr>)
    } else {
      list = ""
    }
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
    jwt: state.login.jwt,
    userId: state.login.userId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToState: (phrase) => dispatch({ type: ADD_TO_STATE, phrase }),
    removeFromState: (phrase) => dispatch({ type: REMOVE_FROM_STATE, phrase }),
    resetState: () => dispatch({ type: RESET_STATE })
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Profile);
