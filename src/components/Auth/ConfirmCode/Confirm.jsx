import React, {useState} from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Classnames from "classnames";
import { confirmAction } from "../actions";
import {isLoadingSelector} from "../selectors";
import {useHistory} from "react-router-dom";

import '../Login/Login.scss';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ConfirmCode = ({ isLoading, confirmAction }) => {

  const classes = useStyles();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmAction({code, email, history});
  };

  return (
      <Container component="main" maxWidth="xs" className="login-container">
        <CircularProgress color="secondary" className={Classnames('spinner', {'loading': isLoading})} />
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Confirm Code
          </Typography>

          <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target?.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Code"
                autoFocus
                onChange={(e) => setCode(e.target?.value)}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
              Confirm
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Resend code?
                </Link>
              </Grid>
              <Grid item>
                <RouterLink to="/auth/login">
                  Already have account?
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
  );
}

const mapStateToProps = state => ({
  isLoading: isLoadingSelector(state)
});

export default connect(mapStateToProps, {confirmAction})(ConfirmCode);
