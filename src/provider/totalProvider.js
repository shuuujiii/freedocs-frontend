import React, { useState } from 'react'
import { AuthProvider } from './authProvider'

// 複数の Context を作成する
// export const FilterContext = React.createContext('this is context!')
// export const FilterProvider = FilterContext.Provider

// sample
// export const InfoContext = React.createContext(true)
// export const InfoProvider = InfoContext.Provider

// error
export const ErrorContext = React.createContext()
export const ErrorProvider = ErrorContext.Provider

// ラップされた子要素全てが、children に props に入ってくる

export const ErrorStateInitial = {
    hasError: false,
    message: '',
}

export const Provider = ({ children }) => {
    const [errorState, setErrorState] = useState(ErrorStateInitial);
    return (
        < ErrorProvider value={{ errorState, setErrorState }}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ ErrorProvider >
    )
}