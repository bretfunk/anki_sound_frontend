import React, { Component } from "react";
import Body from "./Body";

class MainWindow extends Component {
  render() {
    this.state = {};
    return (
      <div className="mainWindowColor">
        <Body {...this.props} />
      </div>
    );
  }
}

export default MainWindow;
