import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isLoggedIn} from "../../Auth/utils";

const PrivateRoute = ({ component: RenderedComponent, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn() ? (
                <RenderedComponent {...props} />
            ) : (
                <Redirect
                    to={{
                      pathname: "/auth/login",
                      state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
