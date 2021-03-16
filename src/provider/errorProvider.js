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
    return (
        <ErrorContext.Provider value={{
            errorState,
            setErrorState,
            init
        }}>
            {children}
        </ErrorContext.Provider>
    )
}

ErrorProvider.propTypes = {
    children: PropTypes.element
}