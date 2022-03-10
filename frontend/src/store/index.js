import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator,
} from "redux-persist-seamless-immutable";

import history from "../routes/history";
import rootReducer from "./ducks";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routerMiddleware(history)];

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator({})],
};

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const store = createStore(persistedReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
