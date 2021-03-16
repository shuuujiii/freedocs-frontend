import React, { useState } from 'react'
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