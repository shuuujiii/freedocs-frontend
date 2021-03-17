import React from 'react'
import PropTypes from 'prop-types'
const AuthContext = React.createContext()

const authInitialState = {
    isAuthenticated: false,
}

export const authActions = {
    INIT: 'INIT',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    AUTHENTICATED: 'AUTHENTICATED'
}

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case authActions.INIT:
            return authInitialState
        case authActions.AUTHENTICATED:
            return { isAuthenticated: true }
        case authActions.LOGIN:
            return { token: action.payload }
        case authActions.LOGOUT:
            return { isAuthenticated: false }
        default:
            return ''
    }
}

export const useAuth = () => {
    return React.useContext(AuthContext)
}
export function AuthProvider({ children }) {
    const [authState, dispatchAuthState] = React.useReducer(AuthReducer, authInitialState)
    const authenticated = () => {
        dispatchAuthState({ type: authActions.AUTHENTICATED })
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
            init,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.array
}