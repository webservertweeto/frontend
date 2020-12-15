import * as AT from './actionTypes';

const initialState = {
  user: {},
  isLoading: false,
  activeTweeterAccount: undefined,
  accounts: [],
  latestTweets: [],
  scheduledTweets: [],
  errorMessage: '',
  messageType: ''
};

export default (state= initialState, action) => {
  switch (action.type) {
    case AT.FETCH_DETAILS:
      return {...state, isLoading: true};
    case AT.FETCH_DETAILS_SUCCESS:
      return {...state, isLoading: false};
    case AT.FETCH_USER_FAILED:
      console.error(action.payload)
      return {...state};
    case AT.DELETE_SCHEDULED_TWEET:
      return {...state, isLoading: true};
    case AT.FETCH_USER_SUCCESS:
      const currentActiveTwitterAccount = state.activeTweeterAccount;
      if (currentActiveTwitterAccount === undefined || currentActiveTwitterAccount === null ) {
        const twitterAccounts = action?.payload?.twitterAccounts;
        const activeTweeterAccount = twitterAccounts ? twitterAccounts[0] : {};
        return {...state, user: action.payload, activeTweeterAccount, accounts: twitterAccounts};
      }
      return {...state};
    case AT.FETCH_LATEST_TWEETS_SUCCESS:
      const latestTweets = action?.payload;
      return {...state, latestTweets};
    case AT.FETCH_SCHEDULED_TWEETS_SUCCESS:
      const scheduledTweets = action.payload?.sort((a, b) => new Date(a?.tweetTime) - new Date(b?.tweetTime));
      return {...state, scheduledTweets, isLoading: false};
    case AT.CHANGE_ACTIVE_ACCOUNT:
      return {...state, activeTweeterAccount: action.payload};
    case AT.ERROR_MESSAGE:
      return {...state, errorMessage: action?.payload?.message, messageType: action?.payload?.type}
    case AT.ERROR_MESSAGE_CLEAR:
      return {...state, errorMessage: undefined, messageType: undefined}
    default:
      return {...state};
  }
};
