import React from 'react'
import PropTypes from 'prop-types'
import { AuthProvider } from './authProvider'
import { ErrorProvider } from './errorProvider'

export const Provider = ({ children }) => {
    return (
        < ErrorProvider >
            <AuthProvider>
                {children}
            </AuthProvider>
        </ ErrorProvider >
    )
}

Provider.propTypes = {
    children: PropTypes.element,
}