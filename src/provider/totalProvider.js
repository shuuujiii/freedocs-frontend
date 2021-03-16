import React, { useState } from 'react'
import { AuthReducer } from '../reducers/authReducer'

// 複数の Context を作成する
// export const FilterContext = React.createContext('this is context!')
// export const FilterProvider = FilterContext.Provider

// sample
// export const InfoContext = React.createContext(true)
// export const InfoProvider = InfoContext.Provider

// error
export const ErrorContext = React.createContext()
export const ErrorProvider = ErrorContext.Provider

export const AuthContext = React.createContext()
export const AuthProvider = AuthContext.Provider

// ラップされた子要素全てが、children に props に入ってくる

export const ErrorStateInitial = {
    hasError: false,
    message: '',
}

export const AuthStateInitial = {
    token: null,
}

export const Provider = ({ children }) => {
    // const filterInitialState = {
    //     error: true,
    //     warning: true,
    //     normal: false,
    // }
    // const infoStateInitial = false


    // この例では useState を使用している 
    // const [filterState, setFilter] = useState(filterInitialState)
    // const [infoState, setInfoState] = useState(false)
    const [errorState, setErrorState] = useState(ErrorStateInitial)
    const [authState, dispatchAuthState] = React.useReducer(AuthReducer, AuthStateInitial)
    // 
    return (
        < ErrorProvider value={{ errorState, setErrorState }}>
            <AuthProvider value={{ authState, dispatchAuthState }}>
                {children}
            </AuthProvider>
        </ ErrorProvider >
    )
}