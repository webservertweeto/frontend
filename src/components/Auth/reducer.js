import * as AT from './actionsTypes';
import {TOKEN_LS_KEY} from "./constants";

const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.SIGN_UP_ACTION:
      return {...state, isLoading: true};
    case AT.LOGIN_ACTION:
      return {...state, isLoading: true};
    case AT.LOGIN_FAILURE:
      return {...state, isLoading: false};
    case AT.LOGIN_SUCCESS:
      localStorage.setItem(TOKEN_LS_KEY, action.payload)
      return {...state, isLoading: false};
    case AT.SIGN_UP_FAILURE:
      return {...state, isLoading: false};
    case AT.SIGN_UP_SUCCESS:
      return {...state, isLoading: false};
    case AT.CONFIRM_ACCOUNT:
      return {...state, isLoading: true}
    default:
      return state;
  }
};
