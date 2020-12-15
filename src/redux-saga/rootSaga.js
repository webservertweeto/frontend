import {all} from 'redux-saga/effects';
import AuthSaga from 'components/Auth/saga';
import DashboardSaga from 'components/Dashboard/saga';

export function* rootSaga() {
  yield all([
      AuthSaga(),
      DashboardSaga()
  ]);
}
