import {all, put, call, takeLatest, select} from 'redux-saga/effects';
import {TOKEN_LS_KEY} from "../Auth/constants";
import {doPost} from "../../http/methods";
import {addAccountEndpoint, BASE_URL, getLatestTweetsEndpoint, getScheduledTweetsEndpoint, getUserEndpoint, removeAccountEndpoint, removeScheduledEndpoint, scheduleTweetEndpoint} from "./endpoints";
import * as AT from './actionTypes';
import {fetchInitialData, fetchInitialDataSuccess, fetchLatestTweets, fetchLatestTweetsSuccess, fetchScheduledTweets, fetchScheduledTweetsSuccess, fetchUserAction, fetchUserSuccess} from "./actions";
import {activeAccountSelector} from "./selectors";

function* initData() {
  yield put(fetchUserAction());
}

function* getUser() {
  const token = localStorage.getItem(TOKEN_LS_KEY);
  const requestBody = {token};

  const response = yield call(doPost, {url: getUserEndpoint, payload: requestBody, headers: {}, options: {}, baseUrl: BASE_URL});

  yield put(fetchUserSuccess(response?.data?.body));
  yield put(fetchLatestTweets());
}

function* getLatestTweets() {

  const activeTwitterAccount = yield select(activeAccountSelector);
  const token = localStorage.getItem(TOKEN_LS_KEY);

  if (activeTwitterAccount && activeTwitterAccount.twitterID) {

    const reqBody = {
      token,
      twitterID: activeTwitterAccount.twitterID
    };

    const response = yield call(doPost, {url: getLatestTweetsEndpoint, payload: reqBody, headers: {}, options: {}, baseUrl: BASE_URL});

    yield put(fetchLatestTweetsSuccess(response?.data?.body?.Data));
    yield put(fetchScheduledTweets());
  } else {
    yield put(fetchLatestTweetsSuccess([]));
    yield put(fetchInitialDataSuccess())
  }
}

function* getScheduledTweets() {

  const token = localStorage.getItem(TOKEN_LS_KEY);

  const payload = {token};

  const response = yield call(doPost, {url: getScheduledTweetsEndpoint, payload, headers: {}, options: {}, baseUrl: BASE_URL});

  yield put(fetchScheduledTweetsSuccess(response?.data?.body?.Data));
}

function* addAccount({ payload }) {
  const token = localStorage.getItem(TOKEN_LS_KEY);
  payload.token = token;

  const response = yield call(doPost, {url: addAccountEndpoint, payload, headers: {}, options: {}, baseUrl: BASE_URL});

  yield put(fetchInitialData());
}

function* removeAccount({ payload }) {
  const token = localStorage.getItem(TOKEN_LS_KEY);
  const reqBody = {
    token,
    twitterID: payload.twitterID
  }
  const response = yield call(doPost, {url: removeAccountEndpoint, payload: reqBody, headers: {}, options: {}, baseUrl: BASE_URL});

  yield put(fetchInitialData());
}

function* removeScheduledTweet({ payload }) {
  const token = localStorage.getItem(TOKEN_LS_KEY);
  const reqBody = {
    token, uuid: payload.uuid
  }
  const response = yield call(doPost, {url: removeScheduledEndpoint, payload: reqBody, headers: {}, options: {}, baseUrl: BASE_URL});
  yield put(fetchInitialData());
}

function* createTweet({ payload }) {
  const token = localStorage.getItem(TOKEN_LS_KEY);

  const activeTwitterAccount = yield select(activeAccountSelector);

  const reqBody = {
    token,
    twitterID: activeTwitterAccount.twitterID,
    ...payload
  }

  const date = new Date(reqBody.tweetTime);
  reqBody.tweetTime = date.getFullYear() +"-" + (date.getMonth() + 1) + "-" + (date.getDate()) + " " + date.getHours() + ":" + date.getMinutes() + ":00";

  const response = yield call(doPost, {url: scheduleTweetEndpoint, payload: reqBody, headers: {}, options: {}, baseUrl: BASE_URL});
  yield put(fetchInitialData());
}

export default function* watcher() {
  yield all([
      takeLatest(AT.FETCH_USER, getUser),
      takeLatest(AT.FETCH_LATEST_TWEETS, getLatestTweets),
      takeLatest(AT.FETCH_SCHEDULED_TWEETS, getScheduledTweets),
      takeLatest(AT.FETCH_DETAILS, initData),
      takeLatest(AT.ADD_TWITTER_ACCOUNT, addAccount),
      takeLatest(AT.REMOVE_ACCOUNT, removeAccount),
      takeLatest(AT.DELETE_SCHEDULED_TWEET, removeScheduledTweet),
      takeLatest(AT.SCHEDULE_TWEET, createTweet)
  ]);
}
