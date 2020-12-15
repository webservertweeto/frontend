import React from 'react';
import {connect} from 'react-redux';
import {latestTweetsSelector} from "../selectors";
import LatestTweet from "./LatestTweet";

import './LatestTweets.scss';

const LatestTweets = ({ latestTweets }) => {

  return (
    <div className="latest-tweets">
      <div>
        Latest Tweets
      </div>
      {
        latestTweets?.map((tweet, index) => <LatestTweet key={index + " " + tweet?.created_at} tweet={tweet} />)
      }
      <div>
        {latestTweets?.length === 0 && 'No Latest Tweets'}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  latestTweets: latestTweetsSelector(state)
});

export default connect(mapStateToProps, null)(LatestTweets);
