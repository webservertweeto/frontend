import * as AT from './actionsTypes';

export const loginAction = (payload) => ({
  type: AT.LOGIN_ACTION,
  payload
});

export const signUpAction = (payload) => ({
  type: AT.SIGN_UP_ACTION,
  payload
});

export const signUpSuccess = (payload) => ({
  type: AT.SIGN_UP_SUCCESS,
  payload
});

export const signUpFailure = (payload) => ({
  type: AT.SIGN_UP_FAILURE,
  payload
});

export const loginSuccess = (payload) => ({
  type: AT.LOGIN_SUCCESS,
  payload
});

export const loginFailure = (payload) => ({
  type: AT.LOGIN_FAILURE,
  payload
});

export const confirmAction = (payload) => ({
  type: AT.CONFIRM_ACCOUNT,
  payload
});

export const confirmSuccess = (payload) => ({
  type: AT.CONFIRM_ACCOUNT_SUCCESS,
  payload
});
