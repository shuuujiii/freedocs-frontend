
import React from 'react';
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import { useHistory } from 'react-router-dom'
import { useError } from '../provider/errorProvider'
// import axios from 'axios';
import axiosbase from './axiosbase'

// components
import Loading from '../components/main/loading'
const PrivateRoute = ({ component: Component, ...rest }) => {
    const auth = useAuth();
    const error = useError();
    const history = useHistory();
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        const authenticate = async () => {
            await axiosbase.post('/users/authenticate')
                .then((res) => {
                    error.init()
                    if (res.data === 'authenticated') {
                        auth.authenticated()
                    } else {
                        auth.notAuthenticated()
                    }
                    setLoading(true)
                }).catch(e => {
                    error.setError(e)
                    auth.notAuthenticated()
                    setLoading(true)
                })
        }
        authenticate();
        // eslint-disable-next-line
    }, [])
    return (
        <Route {...rest} render={props => {
            if (!loading) { return <Loading /> }
            if (auth.authState.isAuthenticated) {
                return <Component {...props} {...rest} />
            } else {
                return (< Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: history.location.pathname || '/userpage' }
                    }
                    }
                />)
            }
        }} />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
}
export default PrivateRoute;