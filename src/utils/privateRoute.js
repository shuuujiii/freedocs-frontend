
import React from 'react';
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import axios from 'axios';
const PrivateRoute = ({ component: Component, ...rest }) => {
    const auth = useAuth()
    const [authCheck, setAuthCheck] = React.useState(false)
    React.useEffect(() => {
        axios.get('http://localhost:5000/api/v1/users/authenticate')
            .then(() => {

                auth.authenticated()
            }).catch(e => { console.log(e) })
        setAuthCheck(true)
        // eslint-disable-next-line
    }, [])
    return (
        <Route {...rest} render={props => {
            if (!authCheck) { return <></> }
            if (auth.authState.isAuthenticated) {
                return <Component {...props} />
            } else {
                <Redirect to="/signin" />
            }
        }} />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.element
}

export default PrivateRoute;