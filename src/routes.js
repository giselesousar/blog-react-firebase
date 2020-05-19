import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import Posts from './pages/Posts';
import Admin from './pages/Admin';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path={process.env.PUBLIC_URL + '/'} exact component={Home}/>
                <Route path={process.env.PUBLIC_URL + "/posts"} component={Posts}/>
                <Route path={process.env.PUBLIC_URL + "/admin"} component={Admin}/>
            </Switch>
        </BrowserRouter>
    );
}