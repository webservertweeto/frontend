import * as AT from './actionTypes';

export const fetchInitialData = () => ({
  type: AT.FETCH_DETAILS,
});

export const fetchInitialDataSuccess = () => ({
  type: AT.FETCH_DETAILS_SUCCESS,
});

export const fetchUserAction = () => ({
  type: AT.FETCH_USER
});

export const fetchUserSuccess = (payload) => ({
  type: AT.FETCH_USER_SUCCESS,
  payload
});

export const fetchUserFailed = () => ({
  type: AT.FETCH_USER_FAILED
});

export const fetchLatestTweets = () => ({
  type: AT.FETCH_LATEST_TWEETS,
});

export const fetchLatestTweetsSuccess = (payload) => ({
  type: AT.FETCH_LATEST_TWEETS_SUCCESS,
  payload
});

export const fetchScheduledTweets = () => ({
  type: AT.FETCH_SCHEDULED_TWEETS,
});

export const fetchScheduledTweetsSuccess = (payload) => ({
  type: AT.FETCH_SCHEDULED_TWEETS_SUCCESS,
  payload
});

export const addNewTwitterAccount = (payload) => ({
  type: AT.ADD_TWITTER_ACCOUNT,
  payload
});

export const deleteAccount = (payload) => ({
  type: AT.REMOVE_ACCOUNT,
  payload
})

export const changeActiveAccount = (payload) => ({
  type: AT.CHANGE_ACTIVE_ACCOUNT,
  payload
});

export const deleteScheduledTweet = (payload) => ({
  type: AT.DELETE_SCHEDULED_TWEET,
  payload
});

export const scheduleTweet = (payload) => ({
  type: AT.SCHEDULE_TWEET,
  payload
});

export const errorMessage = (payload) => ({
  type: AT.ERROR_MESSAGE,
  payload
});

export const clearMessage = () => ({
  type: AT.ERROR_MESSAGE_CLEAR
});
