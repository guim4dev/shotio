import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { reducer as blob } from "./blob";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    blob,
  });
