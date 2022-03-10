import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import { push } from "connected-react-router";

import api from "../../services/api";

import BlobActions, { BlobTypes } from "../ducks/blob";

function* sendBlob({ blob }) {
  try {
    const form = new FormData();
    form.append("audio", blob);

    const { data } = yield call(api.post, "predict", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    yield put(BlobActions.sendBlobSuccess(data));
  } catch (error) {
    console.log(error)
    toast.error("Erro ao enviar áudio!");
    yield put(BlobActions.sendBlobFailure(error));
  }
}

export default all([takeLatest(BlobTypes.SEND_BLOB_REQUEST, sendBlob)]);
