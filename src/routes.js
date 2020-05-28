import React, {useContext} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UserProvider from "./pages/providers/UserProvider";
import { UserContext } from "./pages/providers/UserProvider";
import Profile from './pages/Profile';

import Home from './pages/Home';
import Post from './pages/Post';
import Admin from './pages/Admin';
import SignIn from './pages/SignIn';


export default function Routes(){
    const user = useContext(UserContext);
    return(
    <UserProvider>
         <BrowserRouter>
            <Switch>
                <Route path={process.env.PUBLIC_URL + '/profile'} exact component={Profile}/>
                <Route path={process.env.PUBLIC_URL + '/'} exact component={Home}/>
                <Route path={process.env.PUBLIC_URL + '/post/:slug'} exact component={Post}/>
                <Route path={process.env.PUBLIC_URL + "/admin"} component={Admin}/>
                <Route path={process.env.PUBLIC_URL + "/signin"} component={SignIn}/>
            </Switch>
        </BrowserRouter>
    </UserProvider>
    );
}