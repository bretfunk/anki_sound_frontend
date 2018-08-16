import React, { Component } from "react";
import axios from "axios";
import Form from "./Form";
import StorageURL from "../storageUrl";
import URL from "../url";
import { connect } from "react-redux";
import { submitPhrase, addToState } from "../ducks/Phrase";

class Body extends Component {
  constructor(props) {
    super(props);

    this.createPhrase = this.createPhrase.bind(this);
    this.addToDb = this.addToDb.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.play = this.play.bind(this);
  }

  onSubmit(phrase) {
    phrase.loading = true;
    this.props.createFile(phrase);
    this.props.submitPhrase(phrase);
  }

  addToDb(data) {
    let parsed = data.currentTarget.parentElement.parentElement.innerText;
    let newParsed = parsed
      .replace("Download", "")
      .replace("Save", "")
      .replace("Play", "")
      .split(":");
    let language = newParsed[0];
    let phrase = newParsed[1].replace(language, "").trim();
    let fullPhrase = { phrase: phrase, language: language };
    this.createPhrase(fullPhrase);
    this.props.addToState(fullPhrase);
  }

  createPhrase(phrase) {
    let data = {
      phrase: phrase.phrase,
      language: phrase.language,
      user_id: this.props.userId
    };
    axios
      .post(URL() + "api/phrases", data)
      .then(response => {
        console.log(response + " created");
      })
      .catch(error => {
        console.log(error);
      });
  }

  formatFileName(phrase) {
    return phrase
      .toString()
      .trim()
      .split(" ")
      .join("_");
  }

  format(phrase) {
    let language = this.props.languageHash[phrase.language];
    let fileName = this.props.formatFileName(phrase.phrase);
    let link = StorageURL() + `${language}/${fileName}.mp3`;
    return link;
  }

  play(phrase) {
    const audio = new Audio(this.props.format(phrase));
    audio.play();
  }

  render() {
    let button;
    if (this.props.loggedIn) {
      button = (
        <td>
          <button
            className="btn languageButtonColor btn-sm text-dark"
            onClick={this.addToDb}
          >
            Save
          </button>
        </td>
      );
    } else {
      button = "";
    }

    let list;
    if (this.props.savedPhrases) {
      list = this.props.savedPhrases.map((phrase, index) => (
        <tr key={index}>
          <td className="btn-sm languageButtonColor text-dark btn text-left">
            {phrase.language}:
          </td>
          <td>
            <h4>{phrase.phrase}</h4>
          </td>
          <td>
            <form method="get" action={this.props.format(phrase)}>
              <button
                type="submit"
                className="btn mainButtonColor text-dark btn-sm text-right"
                disabled={phrase.loading}
              >
                Download
              </button>
            </form>
          </td>
          <td>
            <button
              className="btn secondaryButtonColor text-dark btn-sm text-right"
              onClick={() => this.play(phrase)}
              disabled={phrase.loading}
            >
              Play
            </button>
          </td>
          {button}
        </tr>
      ));
    } else {
      list = "";
    }

    return (
      <div className="mainWindowColor">
        <br />
        <h1 className="bannerColor text-white rounded heading">
          Phrase to Convert
        </h1>
        <h5>
          <Form onSubmit={this.onSubmit} />
        </h5>
        <br />
        <h1 className="bannerColor text-white rounded heading">
          Submitted Phrases
        </h1>
        <table width="100%">
          <tbody>{list}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  state => ({
    loggedIn: state.heading.loggedIn,
    savedPhrases: state.phrase.savedPhrases,
    languageHash: state.random.languageHash,
    userId: state.login.userId
  }),
  { submitPhrase, addToState }
)(Body);
