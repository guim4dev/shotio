import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import { push } from "connected-react-router";

import api from "../../services/api";

import AuthActions, { AuthTypes } from "../ducks/auth";

function* signIn({ email, password }) {
  try {
    const { data } = yield call(api.post, "/sessions", {
      email,
      password,
    });

    api.defaults.headers.Authorization = `Bearer ${data.token}`;

    yield put(AuthActions.signInSuccess(data.user, data.token));
  } catch (error) {
    toast.error("Incorrect email or password!");
    yield put(AuthActions.authFailure(error));
  }
}

function* signUp({ username, password }) {
  try {
    yield call(api.post, `/users`, { username, password });
    toast.success("Usuário registrado");
    yield put(AuthActions.signUpSuccess());
    yield put(push("/"));
  } catch (error) {
    toast.error("Erro ao registar usuário");
    yield put(AuthActions.authFailure("Erro ao registar usuário"));
  }
}

function* setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
  takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
]);
