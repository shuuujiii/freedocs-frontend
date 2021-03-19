
import React from 'react'
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../utils/privateRoute'
import Home from './home'
import Userpage from './userPage'
import Profile from './profile'
import Container from '@material-ui/core/Container';
import NotFound from './notFound'
import AppBar from './appBar'
import Footer from './footer'
import Messages from './messages'

const TemplatePage = () => {
    return (
        <div>
            <AppBar />
            <Container maxWidth="lg">
                <Switch>
                    <Route exact path='/' component={Home} />
                    <PrivateRoute path="/userpage" component={Userpage} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route component={NotFound} />
                </Switch>
            </Container>
            <Messages />
            <Footer />
        </div >
    );
}

export default TemplatePage;
