import axios from "axios";
import store from "~/store";
import { toast } from "react-toastify";

import AuthActions from "~/store/ducks/auth";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.response.use(null, (error) => {
  if (error.response.status === 401) {
    store.dispatch(AuthActions.authFailure(error));
    toast.error("Your session has expired");
  }
  return Promise.reject(error);
});

export default api;
