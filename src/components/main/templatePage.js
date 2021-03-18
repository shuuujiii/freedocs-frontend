
import React from 'react'
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../utils/privateRoute'
import Home from './home'
import Userpage from './userPage'
import Account from './account'
import Profile from './profile'
import Container from '@material-ui/core/Container';
import NotFound from './notFound'

import AppBar from './appBar'
import Footer from './footer'
const TemplatePage = () => {
    return (
        <div>
            <AppBar />
            <Container maxWidth="sm">
                <Switch>
                    <Route exact path='/' component={Home} />
                    <PrivateRoute path="/userpage" component={Userpage} />
                    <PrivateRoute path="/account" component={Account} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route component={NotFound} />
                </Switch>
            </Container>
            <Footer />
        </div >
    );
}

export default TemplatePage;
