export const authActions = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
}

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case authActions.LOGIN:
            return { token: action.payload }
        case authActions.LOGOUT:
            return { token: '' }
        default:
            return ''
    }
}
