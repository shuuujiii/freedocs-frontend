import React from 'react'
import PropTypes from 'prop-types'
import axiosbase from '../utils/axiosbase'
const AuthContext = React.createContext()

const authInitialState = {
    isAuthenticated: false,
    user: null,
}

export const authActions = {
    INIT: 'INIT',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    AUTHENTICATED: 'AUTHENTICATED',
    NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
}

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case authActions.INIT:
            return authInitialState
        case authActions.AUTHENTICATED:
            return {
                isAuthenticated: true,
                user: action.payload,
            }
        // case authActions.LOGIN:
        //     return { token: action.payload }
        case authActions.LOGOUT:
            return authInitialState
        default:
            return ''
    }
}

export const useAuth = () => {
    return React.useContext(AuthContext)
}
export function AuthProvider({ children }) {
    const [authState, dispatchAuthState] = React.useReducer(AuthReducer, authInitialState)

    React.useEffect(() => {
        const authenticate = async () => {
            await axiosbase.post('/users/silent')
                .then((res) => {
                    if (res.data.payload.user) {
                        authenticated(res.data.payload.user)
                    } else {
                        notAuthenticated()
                    }
                })
        }
        authenticate();
        // eslint-disable-next-line
    }, [])
    const authenticated = (user) => {
        dispatchAuthState({
            type: authActions.AUTHENTICATED,
            payload: user
        })
    }
    const notAuthenticated = () => {
        dispatchAuthState({ type: authActions.INIT })
    }
    const logout = () => {
        dispatchAuthState({ type: authActions.LOGOUT })
    }
    const init = () => {
        dispatchAuthState({ type: authActions.INIT })
    }
    return (
        <AuthContext.Provider value={{
            authState,
            dispatchAuthState,
            authenticated,
            notAuthenticated,
            init,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.element
}