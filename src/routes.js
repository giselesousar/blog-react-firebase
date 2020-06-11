import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { UserContext } from "./providers/UserProvider";
import Profile from './pages/Profile';

import Home from './pages/Home';
import Post from './pages/Post';
import Admin from './pages/Admin';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PwReset from './pages/PwReset';


export default function Routes() {
    return (
            <BrowserRouter>
                <Switch>
                    <Route path={process.env.PUBLIC_URL + '/'} exact component={Home} />
                    <Route path={process.env.PUBLIC_URL + '/post/:slug'} exact component={Post} />
                    <Route path={process.env.PUBLIC_URL + "/admin"} component={Admin} />
                    <Route path={process.env.PUBLIC_URL + "/signin"} component={SignIn} />
                    <Route path={process.env.PUBLIC_URL + "/signup"} component={SignUp} />
                    <Route path={process.env.PUBLIC_URL + "/pw-reset"} component={PwReset} />
                    <ProfileRoute path={process.env.PUBLIC_URL + "/profile"} component={Profile} />
                    {/**<Route component={PageNotFound}/> */}
                </Switch>
            </BrowserRouter>
    );
}

const ProfileRoute = ({component: Component, ...otherProps}) => {
    const { user }= useContext(UserContext);

    return (
        <Route
            {...otherProps}
            render={props => (
                user !== null
                    ?
                    <Component {...props}/>
                    :
                    <Redirect to="/signin" />
            )}
        />
    )
}