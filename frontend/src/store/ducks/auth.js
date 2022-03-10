import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
/* Types & Action Creators */

const { Types, Creators } = createActions({
  signInRequest: ["email", "password"],
  signInSuccess: ["userActive", "token"],
  authFailure: ["error"],
  signUpRequest: ["username", "password"],
  signUpSuccess: null,
});

export const AuthTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  signedIn: false,
  isLoading: false,
  error: null,
  userActive: null,
  token: null,
});

/* Reducers */

export const signInReq = (state) => state.merge({ isLoading: true });
export const signInSuc = (state, { userActive, token }) =>
  state.merge({ signedIn: true, isLoading: false, userActive, token });

export const authFail = (state, { error }) =>
  state.merge({
    isLoading: false,
    error,
    signedIn: false,
    userActive: null,
  });

export const signUpReq = (state) => state.merge({ isLoading: true });
export const signUpSuc = (state) => state.merge({ isLoading: false });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_REQUEST]: signInReq,
  [Types.SIGN_IN_SUCCESS]: signInSuc,
  [Types.AUTH_FAILURE]: authFail,
  [Types.SIGN_UP_REQUEST]: signUpReq,
  [Types.SIGN_UP_SUCCESS]: signUpSuc,
});
