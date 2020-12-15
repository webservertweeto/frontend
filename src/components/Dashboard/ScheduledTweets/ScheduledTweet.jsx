import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';

import './ScheduledTweets.scss';
import Fab from "@material-ui/core/Fab";
import {deleteScheduledTweet, fetchInitialData} from "../actions";

const ScheduledTweet = ({ tweet, deleteScheduledTweet, fetchInitialData }) => {

  const handleDeleteTweet = () => {
    deleteScheduledTweet(tweet);
  };

  return (
      <div className="latest-tweet">
        <div className="content">
          <div className="header">
            <div className="owner">
              <div className="owner-img">
                <img src={tweet?.twitterProfilePictureHttps} />
              </div>
              {tweet?.twitterFullName}
            </div>
            <div className="created_at">
              {new Date(tweet?.tweetTime).toUTCString()}
            </div>
          </div>
          {
             tweet?.tweetImageLink &&
             <div className="img">
               <img src={tweet?.tweetImageLink} />
             </div>
          }
          <div className="tweet-text">
            {tweet?.tweetText}
          </div>
          <div className="delete">
            <Fab color="primary" aria-label="add" onClick={() => handleDeleteTweet()}>
              <DeleteIcon />
            </Fab>
          </div>
        </div>
      </div>
  )
}

export default connect(null, { deleteScheduledTweet, fetchInitialData })(ScheduledTweet);
