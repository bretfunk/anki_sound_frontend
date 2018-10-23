import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import StorageURL from "./storageUrl";
// import LambdaURL from "./lambdaUrl";
import URL from "./url";
import Header from "./components/Header";
import MainWindow from "./components/MainWindow";
import SideWindow from "./components/SideWindow";
import Login from "./components/Login";
import NewUser from "./components/NewUser";
import { connect } from "react-redux";
import { disableLoading } from "./ducks/Phrase";

class App extends Component {
  constructor(props) {
    super(props);
    this.format = this.format.bind(this);
    this.formatFileName = this.formatFileName.bind(this);
    this.createFile = this.createFile.bind(this);
    this.disableLoading = this.disableLoading.bind(this);
  }

  disableLoading(phrase) {
    const { savedPhrases } = this.props;
    for (let i = 0; i < savedPhrases.length; i++) {
      if (
        savedPhrases[i].phrase === phrase.phrase &&
        savedPhrases[i].language === phrase.language
      ) {
        this.props.disableLoading(i);
      }
    }
  }

  format(phrase) {
    let language = this.props.languageHash[phrase.language];
    let fileName = this.formatFileName(phrase.phrase);
    let link = StorageURL() + `${language}/${fileName}.mp3`;
    return link;
  }

  formatFileName(phrase) {
    return phrase
      .toString()
      .trim()
      .split(" ")
      .join("_");
  }

  createFile(rawPhrase) {
    let phrase = rawPhrase.phrase;
    let language = this.props.languageHash[rawPhrase.language];
    let fileName = this.formatFileName(phrase);
    // axios
    // .get(
    // LambdaURL() +
    // `?phrase=${phrase}&language=${language}&file_name=${fileName}`
    axios
      .get(
        URL() +
          `audio?phrase=${phrase}&language=${language}&file_name=${fileName}`
      )
      .then(response => {
        this.disableLoading(rawPhrase);
      });
  }

  render() {
    let orientation;
    if (this.props.loggedIn) {
      orientation = (
        <div className="row text-center">
          <div className="col-7">
            <MainWindow
              format={this.format}
              formatFileName={this.formatFileName}
              createFile={this.createFile}
            />
          </div>
          <div className="col-5">
            <SideWindow
              format={this.format}
              formatFileName={this.formatFileName}
              createFile={this.createFile}
            />
          </div>
        </div>
      );
    } else {
      orientation = (
        <div className="text-center col-12">
          <MainWindow
            format={this.format}
            formatFileName={this.formatFileName}
            createFile={this.createFile}
          />
        </div>
      );
    }

    let logging;
    if (this.props.tryingToLogin) {
      logging = (
        <div className="row">
          <br />
          <br />
          <Login />
        </div>
      );
    } else {
      logging = "";
    }

    let createUser;
    if (this.props.tryingToCreateUser) {
      createUser = (
        <div className="row">
          <br />
          <br />
          <NewUser />
        </div>
      );
    } else {
      createUser = "";
    }

    return (
      <div className="mainWindowColor container-fluid">
        <Header logOut={this.logOut} />
        {logging}
        {createUser}
        {orientation}
      </div>
    );
  }
}

export default connect(
  state => ({
    loggedIn: state.heading.loggedIn,
    savedPhrases: state.phrase.savedPhrases,
    tryingToLogin: state.heading.tryingToLogin,
    tryingToCreateUser: state.heading.tryingToCreateUser,
    languageHash: state.random.languageHash
  }),
  { disableLoading }
)(App);
