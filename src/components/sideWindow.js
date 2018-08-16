import React, { Component } from "react";
import Profile from "./Profile";

class SideWindow extends Component {
  render() {
    return (
      <div className="mainWindowColor">
        <Profile {...this.props} />
      </div>
    );
  }
}

export default SideWindow;
