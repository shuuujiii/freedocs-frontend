import React from 'react'
import PropTypes from 'prop-types'
import axiosbase from '../utils/axiosbase'
export const AuthContext = React.createContext()

const authInitialState = {
    // isAuthenticated: false,
    user: null,
    isLoading: true,
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
                // isAuthenticated: true,
                user: action.payload,
                isLoading: false,
            }
        case authActions.NOT_AUTHENTICATED:
            return {
                // isAuthenticated: false,
                user: null,
                isLoading: false,
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
        axiosbase.post('/users/silent')
            .then((res) => {
                if (res.data.payload.user) {
                    authenticated(res.data.payload.user)
                } else {
                    notAuthenticated()
                }
            }).catch(e => {
                console.log(e)
                notAuthenticated()
            })
        // eslint-disable-next-line
    }, [])
    const authenticated = (user) => {
        dispatchAuthState({
            type: authActions.AUTHENTICATED,
            payload: user
        })
    }
    const notAuthenticated = () => {
        dispatchAuthState({ type: authActions.NOT_AUTHENTICATED })
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