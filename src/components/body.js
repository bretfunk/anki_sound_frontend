import React, { Component } from 'react';
import Form from './Form'
import { connect } from 'react-redux';
import { SUBMIT_PHRASE } from '../store/constants/action-types';
import { submitPhrase } from '../store/actions/index'

class Body extends Component {
  constructor(props) {
    super(props);
  }

  play = () => {
    this.audio.play();
  }

  render() {
    let button;
    if (this.props.loggedIn) {
      button = <td><button
          className="btn secondaryButtonColor btn-sm text-dark"
          onClick={this.props.savePhrase}
        >Save to Profile</button></td>
    }  else {
      button = ""
    }

    let list;
    if (this.props.savedPhrases) {
    list = this.props.savedPhrases.map((phrase, index) =>
      <tr key={index}>
        <td className= "btn-sm languageButtonColor text-dark btn text-left">{phrase.language}:</td>
        <td><h4>{phrase.phrase}</h4></td>
        <td><a className="btn secondaryButtonColor" href={this.props.format(phrase)}
            className="btn mainButtonColor text-dark btn-sm text-right" download>Download </a></td>
        <td><audio ref={(audio) => { this.audio = audio; }} src={this.props.format(phrase)} type="audio/mp3"> </audio></td>
        {button}
      </tr>)
    } else {
      list = ""
    }

    //this is the play button but it only works when one word is present
    //<td><button onClick={this.play}>Play</button></td>
    return (
      <div className="mainWindowColor">
        <br />
        <h1 className="bannerColor text-white rounded heading">Phrase to Convert</h1>
        <h5><Form onSubmit={this.props.submitPhrase}/></h5>
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

function mapStateToProps(state) {
  return {
    loggedIn: state.heading.loggedIn,
    savedPhrases: state.phrase.savedPhrases
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeLoggedIn: () => dispatch({ type: 'CHANGE_LOGGED_IN' }),
    submitPhrase: (phrase) => dispatch({ type: SUBMIT_PHRASE, phrase })
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (Body);

//export default Body;


