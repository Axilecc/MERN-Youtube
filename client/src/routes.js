import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {LinksPage} from './pages/LinksPage';
import {DetailPage} from './pages/DetailPage';
import {CreatePage} from './pages/CreatePage';
import {AuthPage} from './pages/AuthPage';

export const useRoutes = isAuth  => {
    
    if(isAuth) {
        return (
            <Switch>
                <Route path="/create" exact render={() =>  <CreatePage/> }/>
                <Route path="/links" exact render={() =>  <LinksPage/> }/>
                <Route path="/detail/:id"  render={() =>  <DetailPage/> }/>
                <Redirect to="/create" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact render={() =>  <AuthPage/> }/>
            <Redirect to="/" />
        </Switch>
    )
}