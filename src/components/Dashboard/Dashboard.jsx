import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import './Dashboard.scss';
import ScheduleTweet from "./ScheduleTweet";
import {isLoadingSelector, userSelector} from "./selectors";
import { fetchInitialData } from './actions';
import LatestTweets from "./LatestTweets/LatestTweets";
import ScheduledTweets from "./ScheduledTweets/ScheduledTweets";
import Accounts from "./Accounts/Accounts";
import CircularProgress from "@material-ui/core/CircularProgress";

const Dashboard = ({ fetchInitialData, isLoading }) => {

  useEffect(() => {
    fetchInitialData();
  }, []);

  if (isLoading) {
    return (<div>
      <div style={{width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <CircularProgress color="secondary"/>
      </div>
    </div>);
  }

  return (
      <div className="dashboard-container">

        <div className="tweeter-account">
          <Accounts />
        </div>

        <div className="tweeter-body">

          <div className="schedule-tweet">
            <ScheduleTweet />
          </div>

          <div className="tweets-container">
            <div className="scheduled-tweets">
              <ScheduledTweets />
            </div>
            <div className="latest-tweets-container">
              <LatestTweets />
            </div>
          </div>
        </div>

      </div>
  );
};

const mapStateToProps = state => ({
  isLoading: isLoadingSelector(state),
  user: userSelector(state)
});

export default connect(mapStateToProps, { fetchInitialData })(Dashboard);
