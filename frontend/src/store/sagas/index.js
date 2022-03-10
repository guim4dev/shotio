import { all } from "redux-saga/effects";

import Blob from "./blob";

export default function* rootSaga() {
  yield all([Blob]);
}
