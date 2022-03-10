import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
/* Types & Action Creators */

const { Types, Creators } = createActions({
  sendBlobRequest: ["blob"],
  sendBlobSuccess: null,
  sendBlobFailure: ["error"],
});

export const BlobTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  isLoading: false,
  error: null,
});

/* Reducers */

export const sendBlobReq = (state) => state.merge({ isLoading: true });
export const sendBlobSuc = (state) => state.merge({ isLoading: false });
export const sendBlobFail = (state, { error }) =>
  state.merge({
    isLoading: false,
    error,
  });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEND_BLOB_REQUEST]: sendBlobReq,
  [Types.SEND_BLOB_SUCCESS]: sendBlobSuc,
  [Types.SEND_BLOB_FAILURE]: sendBlobFail,
});
