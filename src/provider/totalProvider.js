import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './authProvider'
import { ErrorProvider } from './errorProvider'
import { MessageProvider } from './messageProvider'
export const Provider = ({ children }) => {
    return (
        < ErrorProvider >
            <MessageProvider>
                <AuthProvider>
                    <Router>
                        {children}
                    </Router>
                </AuthProvider>
            </MessageProvider>
        </ ErrorProvider >
    )
}

Provider.propTypes = {
    children: PropTypes.element,
}