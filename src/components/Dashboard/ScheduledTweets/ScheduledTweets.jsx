import React from 'react';
import {connect} from 'react-redux';
import {scheduledTweetsSelector} from "../selectors";

import './ScheduledTweets.scss';
import ScheduledTweet from "./ScheduledTweet";

const LatestTweets = ({ scheduledTweets }) => {

  return (
      <div className="latest-tweets">
        <div>
          Scheduled Tweets
        </div>
        {
          scheduledTweets?.map((tweet, index) => <ScheduledTweet key={index + " " + tweet?.uuid} tweet={tweet} />)
        }
        <div>
          {scheduledTweets?.length === 0 && 'No Scheduled Tweets'}
        </div>
      </div>
  );
};

const mapStateToProps = (state) => ({
  scheduledTweets: scheduledTweetsSelector(state)
});

export default connect(mapStateToProps, null)(LatestTweets);
