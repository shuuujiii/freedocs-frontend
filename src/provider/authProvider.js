import React from 'react'

const AuthContext = React.createContext()

const AuthStateInitial = {
    isAuthenticated: false,
}

export const authActions = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    AUTHENTICATED: 'AUTHENTICATED'
}

export const AuthReducer = (state, action) => {
    switch (action.type) {
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
export const AuthProvider = ({ children }) => {
    const [authState, dispatchAuthState] = React.useReducer(AuthReducer, AuthStateInitial)
    const authenticated = () => {
        dispatchAuthState({ type: authActions.AUTHENTICATED })
    }
    const logout = () => {
        dispatchAuthState({ type: authActions.LOGOUT })
    }
    return (
        <AuthContext.Provider value={{
            authState,
            dispatchAuthState,
            authenticated,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
