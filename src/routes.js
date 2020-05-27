import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UserProvider from "./providers/UserProvider";

import Home from './pages/Home';
import Post from './pages/Post';
import Admin from './pages/Admin';


export default function Routes(){
    return(
    <UserProvider>
        <BrowserRouter>
            <Switch>
                <Route path={process.env.PUBLIC_URL + '/'} exact component={Home}/>
                <Route path={process.env.PUBLIC_URL + '/post/:slug'} exact component={Post}/>
                <Route path={process.env.PUBLIC_URL + "/admin"} component={Admin}/>
            </Switch>
        </BrowserRouter>
    </UserProvider>
    );
}