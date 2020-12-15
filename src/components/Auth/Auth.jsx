import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import ConfirmCode from "./ConfirmCode/Confirm";

export default () => (
    <div className="auth-container">
      <Switch>
        <Route path="/auth/login" component={Login}/>
        <Route path="/auth/sign-up" component={SignUp}/>
        <Route path="/auth/confirm" component={ConfirmCode} />
        <Route path="/auth" exact render={() => <Redirect to="/auth/login" /> }/>
        <Route path="/*" render={() => <Redirect to="/auth/login" /> } />
      </Switch>
    </div>
);
