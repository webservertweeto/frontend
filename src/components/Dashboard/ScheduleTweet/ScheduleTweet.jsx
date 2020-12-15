import React, {useState} from 'react';
import {connect} from 'react-redux';
import './ScheduleTweet.scss';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {scheduleTweet} from "../actions";

const ScheduleForm = ({ visible, onClose, scheduleTweet }) => {

  const [isLoading ,setLoading] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [tweet, setTweet] = useState("");

  const handleSubmit = () => {
    setLoading(true);
    scheduleTweet({tweetText: tweet, tweetTime: scheduleDate})
  };

  return (
      <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
        {
          isLoading ?
              <div style={{width: 500, height: 500, display: "flex", alignItems: "center", justifyContent: "center"}}>
                <CircularProgress color="secondary"/>
              </div>
              :
              (
                  <React.Fragment>
                    <DialogTitle id="form-dialog-title">Schedule Tweet</DialogTitle>
                    <DialogContent>
                      <div className="tweet-container">
                        <TextareaAutosize aria-label="Tweet" rowsMin={3} placeholder="Tweet" value={tweet} onChange={(e) => setTweet(e.target?.value)}/>
                        <TextField
                            label="When should this tweet go live?"
                            type="datetime-local"
                            value={scheduleDate}
                            onChange={e => setScheduleDate(e.target?.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                        />
                        <input type="file" />
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={onClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={() => handleSubmit()} color="primary">
                        Submit
                      </Button>
                    </DialogActions>
                  </React.Fragment>
              )
        }
      </Dialog>
  );
}

const ScheduleTweet = ({ scheduleTweet }) => {

  const [isModalVisible, setModalVisible] = useState(false);

  return (
      <div className="schedule-tweet">
        <Button variant="contained" color="primary" onClick={() => setModalVisible(true)}>
          Schedule Tweet
        </Button>
        <ScheduleForm visible={isModalVisible}
                      scheduleTweet={scheduleTweet}
                      onClose={() => setModalVisible(false)}/>
      </div>
  )
};

export default connect(null, { scheduleTweet })(ScheduleTweet);
