import { createSelector } from 'reselect';

export const authSelector = state => state.auth;

export const isLoadingSelector = createSelector(authSelector, state => state.isLoading);
