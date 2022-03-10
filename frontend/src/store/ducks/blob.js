import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
/* Types & Action Creators */

const { Types, Creators } = createActions({
  sendBlobRequest: ["blob"],
  sendBlobSuccess: ['data'],
  sendBlobFailure: ["error"],
});

export const BlobTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  isLoading: false,
  error: null,
  data: {
    probability: 0.0,
    result: false
  }
});

/* Reducers */

export const sendBlobReq = (state) => state.merge({ isLoading: true });
export const sendBlobSuc = (state, {data}) => state.merge({ isLoading: false, data });
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
