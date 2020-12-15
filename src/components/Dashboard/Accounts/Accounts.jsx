import React, {useState} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";
import './Accounts.scss';
import {activeAccountSelector, userSelector} from "../selectors";
import {TOKEN_LS_KEY} from "../../Auth/constants";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {addNewTwitterAccount, changeActiveAccount, deleteAccount, fetchInitialData} from "../actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const AddAccount = ({ visible, onClose, submit}) => {

  const [consumerKey, setConsumerKey] = useState("");
  const [consumerSecret, setConsumerSecret] = useState("");
  const [accessTokenKey, setAccessTokenKey] = useState("");
  const [accessTokenSecret, setAccessTokenSecret] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    const payload = {
      consumerKey, consumerSecret, accessTokenKey, accessTokenSecret
    };
    submit(payload);
  }

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
                    <DialogTitle id="form-dialog-title">Add Account</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        To add account you need to enter the following information
                      </DialogContentText>
                      <TextField
                          autoFocus
                          margin="normal"
                          label="Consumer Key"
                          type="password"
                          value={consumerKey}
                          onChange={(e) => setConsumerKey(e.target.value)}
                          fullWidth
                      />
                      <TextField
                          autoFocus
                          margin="normal"
                          label="Consumer Secret"
                          type="password"
                          fullWidth
                          value={consumerSecret}
                          onChange={(e) => setConsumerSecret(e.target.value)}
                      />
                      <TextField
                          autoFocus
                          margin="normal"
                          label="Access Token key"
                          type="password"
                          fullWidth
                          value={accessTokenKey}
                          onChange={(e) => setAccessTokenKey(e.target.value)}
                      />
                      <TextField
                          autoFocus
                          margin="normal"
                          label="Access Token Secret"
                          type="password"
                          fullWidth
                          value={accessTokenSecret}
                          onChange={(e) => setAccessTokenSecret(e.target.value)}
                      />
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

const Accounts = ({ user, activeAccount, addNewTwitterAccount, deleteAccount, changeActiveAccount, fetchInitialData }) => {

  const history = useHistory();

  const [isAddModalVisible, setAddModalVisibility] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_LS_KEY);
    history.push("/auth/login");
  };

  const handleAccountChange = (account) => {
    changeActiveAccount(account);
    fetchInitialData();
  };

  const handleRemoveAccount = (account) => {
    deleteAccount(account);
  };

  const handleAddAccount = () => {
    setAddModalVisibility(true);
  };

  return (
    <div>

      <div className="active-user">
        <div className="name">
          {user?.email}
        </div>
        <div className="logout">
          <Button onClick={handleLogout}
                  variant="contained"
                  color="primary">
            Logout
          </Button>
        </div>
      </div>

      <div className="twitter-accounts">
        Twitter Accounts
        {
          user?.twitterAccounts?.map(
              account => (
                  <div className="account-container" key={account?.twitterID}>
                      <div className="avatar">
                        <div className="image">
                          <img src={account?.twitterProfilePictureHttps} />
                        </div>
                        <div className="username">
                          {account?.twitterFullName}
                        </div>
                      </div>

                      <div className="action">
                        <Button onClick={() => handleRemoveAccount(account)}
                                variant="contained"
                                color="primary">
                          Remove
                        </Button>
                        <Button onClick={() => handleAccountChange(account)}
                                disabled={activeAccount?.twitterID === account?.twitterID}
                                variant="contained"
                                color="primary">
                          {activeAccount?.twitterID === account?.twitterID ? "Selected" : "Select"}
                        </Button>
                      </div>
                  </div>
              )
          )
        }
        <div style={{margin: 10}}>
          <Button onClick={() => handleAddAccount()}
                  variant={"outlined"}
                  fullWidth={true}
                  color="primary">
            Add Account
          </Button>
        </div>
      </div>

      <AddAccount
          visible={isAddModalVisible}
          submit={addNewTwitterAccount}
          onClose={() => setAddModalVisibility(false)}/>
    </div>
  );
};

const mapStateToProps = state => ({
  user: userSelector(state),
  activeAccount: activeAccountSelector(state)
});

export default connect(mapStateToProps, { addNewTwitterAccount, deleteAccount, changeActiveAccount, fetchInitialData })(Accounts);
