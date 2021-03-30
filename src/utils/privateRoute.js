
import React from 'react';
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
const PrivateRoute = ({ component: Component, ...rest }) => {
    const auth = useAuth();
    const history = useHistory();
    const [authCheck, setAuthCheck] = React.useState(false)
    React.useEffect(() => {
        axios.defaults.withCredentials = true;
        const getData = async () => {
            await axios.post(process.env.REACT_APP_API + '/users/authenticate')
                .then((res) => {
                    if (res.data === 'authenticated') {
                        auth.authenticated()
                    } else {
                        auth.notAuthenticated()
                        history.push('/signin')
                    }
                }).catch(e => {
                    history.push('/signin')
                })
        }
        getData();
        setAuthCheck(true)
        // eslint-disable-next-line
    }, [])
    return (
        <Route {...rest} render={props => {
            if (!authCheck) { return <></> }
            if (auth.authState.isAuthenticated) {
                return <Component {...props} {...rest} />
            } else {
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                // to="/signin"
                />
            }
        }} />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
}
export default PrivateRoute;