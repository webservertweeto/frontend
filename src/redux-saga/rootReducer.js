import { combineReducers } from 'redux';
import AuthReducer from 'components/Auth/reducer';
import DashboardReducer from "components/Dashboard/reducer";

export default combineReducers({
  auth: AuthReducer,
  dashboard: DashboardReducer
});
