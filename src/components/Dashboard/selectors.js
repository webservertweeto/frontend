import { createSelector } from 'reselect';

export const dashboardSelector = state => state.dashboard;

export const isLoadingSelector = createSelector(dashboardSelector, state => state.isLoading);

export const userSelector = createSelector(dashboardSelector, state => state.user);

export const activeAccountSelector = createSelector(dashboardSelector, state => state.activeTweeterAccount);

export const latestTweetsSelector = createSelector(dashboardSelector, state => state.latestTweets);

export const scheduledTweetsSelector = createSelector(dashboardSelector, state => state.scheduledTweets);
