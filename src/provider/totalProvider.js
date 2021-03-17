import React from 'react'
import PropTypes from 'prop-types'
import { AuthProvider } from './authProvider'
import { ErrorProvider } from './errorProvider'
import { MessageProvider } from './messageProvider'
export const Provider = ({ children }) => {
    return (
        < ErrorProvider >
            <MessageProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </MessageProvider>
        </ ErrorProvider >
    )
}

Provider.propTypes = {
    children: PropTypes.array,
}