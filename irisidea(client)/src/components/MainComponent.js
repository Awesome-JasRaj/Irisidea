import React, { Component } from "react";
import { withRouter } from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./HomeComponent";
class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      </>
    );
  }
}

export default withRouter(Main);
