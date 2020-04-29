import React, { Component } from "react";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <>
        <Toolbar />
        <Routes />
      </>
    );
  }
}

export default App;
