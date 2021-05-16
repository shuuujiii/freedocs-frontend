import React from 'react'
import PropTypes from 'prop-types'
export const MessageContext = React.createContext()
const initialMessageState = {
    open: false,
    message: '',
    severity: 'success',
}

const messageAction = {
    INIT: 'INIT',
    OPEN: 'OPEN',
    CLOSE: 'CLOSE',
    SUCCESS: 'SUCCESS',
    WARNING: 'WARNING',
    INFO: 'INFO',
}

const messageReducer = (state, action) => {
    switch (action.type) {
        case messageAction.INIT:
            return initialMessageState;
        case messageAction.OPEN:
            return {
                ...state,
                open: true,
            }
        case messageAction.CLOSE:
            return {
                ...state,
                open: false,
            };
        case messageAction.SUCCESS:
            return {
                open: true,
                message: action.payload,
                severity: 'success'
            }
        case messageAction.WARNING:
            return {
                open: true,
                message: action.payload,
                severity: 'warning',
            }
        case messageAction.INFO:
            return {
                open: true,
                message: action.payload,
                severity: 'info'
            }
        default:
            throw new Error('message reducer failed')
    }
}
export const useMessage = () => { return React.useContext(MessageContext) }
export const MessageProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(messageReducer, initialMessageState)
    const init = () => {
        dispatch({ type: messageAction.INIT })
    }
    const open = () => {
        dispatch({ type: messageAction.OPEN })
    }
    const close = () => {
        dispatch({ type: messageAction.CLOSE })
        // dispatch({ type: messageAction.INIT })
    }
    const successMessage = (message) => {
        dispatch({ type: messageAction.SUCCESS, payload: message })
    }
    const warningMessage = (message) => {
        dispatch({ type: messageAction.WARNING, payload: message })
    }
    const infoMessage = (message) => {
        dispatch({ type: messageAction.INFO, payload: message })
    }
    return (
        <MessageContext.Provider value={{
            state,
            init,
            open,
            close,
            successMessage,
            warningMessage,
            infoMessage,
        }}>
            {children}
        </MessageContext.Provider>
    )
}

MessageProvider.propTypes = {
    children: PropTypes.element
}