
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import axios from 'axios';
const PrivateRoute = ({ component: Component, ...rest }) => {
    const auth = useAuth()
    const [authCheck, setAuthCheck] = React.useState(false)
    React.useEffect(() => {
        axios.get('http://localhost:5000/api/v1/users/authenticate')
            .then(res => {
                auth.authenticated()
            }).catch(e => { console.log(e) })
        setAuthCheck(true)
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

export default PrivateRoute;