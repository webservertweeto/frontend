import React from 'react';
import './LatestTweets.scss';

const LatestTweet = ({ tweet }) => {

  return (
      <div className="latest-tweet">
        <div className="content">
          {
            tweet?.imageURL &&
            <div className="img">
              <img src={tweet?.imageURL} />
            </div>
          }
          <div className="tweet-text">
            {tweet?.text}
          </div>
        </div>
        <div className="stats">
          <div className="fav-count">
            Favorites: {tweet?.favorite_count}
          </div>
          <div className="retweet-count">
            Retweets: {tweet?.retweet_count}
          </div>
          <div className="created_at">
            Posted on: {new Date(tweet?.created_at).toUTCString()}
          </div>
        </div>
      </div>
  )
}

export default LatestTweet;
