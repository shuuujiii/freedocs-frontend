import React, { useState } from 'react'


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
    // 
    return (
        < ErrorProvider value={{ errorState, setErrorState }}>
            { children}
        </ ErrorProvider >
    )
}