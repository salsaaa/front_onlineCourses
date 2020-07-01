import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem("UserType") === "admin"
            ? <Component {...props}{...rest} />
            : <Redirect to='/' />
    )} />
)

export default GuardedRoute;