import React from "react";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import history from "./history";
import Route from "./Route";

import Main from "~/pages/Main";

export default function Routes() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Main} />
      </Switch>
    </ConnectedRouter>
  );
}
