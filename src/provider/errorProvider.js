import React from 'react'
import PropTypes from 'prop-types'
const ErrorContext = React.createContext()
const initialErrorState = {
    hasError: false,
    message: null,
}
export const useError = () => { return React.useContext(ErrorContext) }
export const ErrorProvider = ({ children }) => {
    const [errorState, setErrorState] = React.useState(initialErrorState)
    const init = () => {
        setErrorState(initialErrorState)
    }
    const setError = (err) => {
        setErrorState({
            hasError: true,
            message: err.response?.data?.message || 'Sorry! it may be a bug :P'
        })
        if (!err.response?.data?.message) {
            console.log(err)
        }

    }
    return (
        <ErrorContext.Provider value={{
            errorState,
            init,
            setError,
        }}>
            {children}
        </ErrorContext.Provider>
    )
}

ErrorProvider.propTypes = {
    children: PropTypes.element
}