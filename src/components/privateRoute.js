
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../provider/totalProvider'
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authState } = React.useContext(AuthContext)
    console.log('token is', authState.token)
    return (
        <Route {...rest} render={props => (
            authState.token ?
                <Component {...props} />
                : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;