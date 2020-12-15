
const prefix = "dashboard";

export const FETCH_DETAILS = `${prefix}/fetchInitDetails`;
export const FETCH_DETAILS_SUCCESS = `${prefix}/fetchInitDetailsSuccess`;

export const FETCH_USER = `${prefix}/fetchUser`;
export const FETCH_USER_SUCCESS = `${prefix}/FetchUserSuccess`;
export const FETCH_USER_FAILED = `${prefix}/FetchUserFailed`;

export const FETCH_LATEST_TWEETS = `${prefix}/fetchTweets`;
export const FETCH_LATEST_TWEETS_SUCCESS = `${prefix}/fetchTweetsSuccess`;

export const FETCH_SCHEDULED_TWEETS = `${prefix}/fetchScheduledTweets`;
export const FETCH_SCHEDULED_TWEETS_SUCCESS = `${prefix}/fetchScheduledTweetsSuccess`;

export const ADD_TWITTER_ACCOUNT = `${prefix}/addTwitterAccount`;
export const REMOVE_ACCOUNT = `${prefix}/remove-account`;
export const CHANGE_ACTIVE_ACCOUNT = `${prefix}/change-active-account`;

export const DELETE_SCHEDULED_TWEET = `${prefix}/remove-scheduled-tweet`;
export const SCHEDULE_TWEET = `${prefix}/schedule-tweet`;
export const ERROR_MESSAGE = `${prefix}/error-message`;
export const ERROR_MESSAGE_CLEAR = `${prefix}/error-message-clear`;
