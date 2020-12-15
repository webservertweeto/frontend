import {all, call, takeLatest, put} from 'redux-saga/effects';
import * as AT from './actionsTypes';
import {loginSuccess, signUpSuccess} from "./actions";
import {doPost} from "../../http/methods";
import {confirmEndpoint, loginEndpoint, signUpEndpoint} from "./endpoints";
import {BASE_URL} from "../Dashboard/endpoints";
import {TOKEN_LS_KEY} from "./constants";
import {errorMessage} from "../Dashboard/actions";

function* login({ payload }) {

  const response = yield call(doPost, {url: loginEndpoint, payload:
        {email: payload?.email, password: payload?.password}, baseUrl: BASE_URL});

  if (response?.data?.body?.access_token) {
    yield put(signUpSuccess(payload));
    localStorage.setItem(TOKEN_LS_KEY, response.data.body.access_token);
    payload?.history?.push("/dashboard");
  } else if (response?.data?.body?.Error) {
    yield put(signUpSuccess(payload));
    yield put(errorMessage({message: response?.data?.body?.Error, type: "error"}));
  }

  yield put(loginSuccess(response?.data?.body?.access_token));

}

function* signUp({ payload }) {

  const response = yield call(doPost, {url: signUpEndpoint, payload, baseUrl: BASE_URL});

  if (response?.data?.body?.Success) {
    yield put(signUpSuccess(payload));
    yield put(errorMessage({message: response?.data?.body?.Success, type: "success"}));
    payload?.history?.push("/auth/confirm");
  } else if (response?.data?.body?.Error) {
    yield put(signUpSuccess(payload));
    yield put(errorMessage({message: response?.data?.body?.Error, type: "error"}));
  }

  console.error("SOMETHING WENT WRONG in Creating Account", response);
}

function* confirmCode({ payload }) {
  const response = yield call(doPost, {url: confirmEndpoint, payload, baseUrl: BASE_URL});
  if (response?.data?.body?.Success) {
    yield put(signUpSuccess(payload));
    yield put(errorMessage({message: response?.data?.body?.Success, type: "success"}));
    payload?.history?.push("/login");
  } else if (response?.data?.body?.Error) {
    yield put(signUpSuccess(payload));
    yield put(errorMessage({message: response?.data?.body?.Error, type: "error"}));
  }
}

export default function* watcher() {
  yield all([
      takeLatest(AT.LOGIN_ACTION, login),
      takeLatest(AT.SIGN_UP_ACTION, signUp),
      takeLatest(AT.CONFIRM_ACCOUNT, confirmCode)
  ]);
}
