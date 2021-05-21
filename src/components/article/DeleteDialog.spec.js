import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockAxios from 'axios'
import DeleteDialog from './DeleteDialog'
import * as Error from '../../provider/errorProvider'
import * as Message from '../../provider/messageProvider'
const reload = jest.fn()
describe('DeleteDialog', () => {
    const { location } = window;

    beforeAll(() => {
        delete window.location;
        window.location = { reload: reload };
    });

    afterAll(() => {
        window.location = location;
    });
    test('should render', () => {
        render(<DeleteDialog open={true} handleClose={jest.fn()} _id={'1'} />)
        expect(screen.getByTestId('delete-dialog-title')).toBeInTheDocument()
        expect(screen.getByTestId('delete-dialog-title')).toHaveTextContent('Delete Item')
        expect(screen.getByTestId('delete-dialog-message')).toBeInTheDocument()
        expect(screen.getByTestId('delete-dialog-message')).toHaveTextContent('Are you sure you want to delete this item? This cannot be undone.')
        expect(screen.getByTestId('delete-dialog-button')).toBeInTheDocument()
        expect(screen.getByTestId('delete-dialog-button')).toHaveTextContent('Delete')
    })
    test('should call delete api', async () => {
        const message = jest.spyOn(Message, 'useMessage').mockImplementation(() => {
            return {
                successMessage: jest.fn()
            }
        })

        render(< DeleteDialog open={true} handleClose={jest.fn()} _id={'1'} />)
        mockAxios.delete.mockImplementation(() => {
            return Promise.resolve()
        })
        act(() => {
            userEvent.click(screen.getByTestId('delete-dialog-button'))
        })
        expect(mockAxios.delete).toHaveBeenCalledTimes(1)
        expect(message).toHaveBeenCalledTimes(1)
        expect(await reload).toHaveBeenCalledTimes(1)
    })
    test(' call bad api', () => {
        const error = jest.spyOn(Error, 'useError').mockImplementation(() => {
            return {
                setError: jest.fn()
            }
        })
        render(< DeleteDialog open={true} handleClose={jest.fn()} _id={'1'} />)
        mockAxios.delete.mockImplementation(() => {
            return Promise.reject()
        })
        act(() => {
            userEvent.click(screen.getByTestId('delete-dialog-button'))
        })
        expect(mockAxios.delete).toHaveBeenCalledTimes(1)
        expect(error).toHaveBeenCalledTimes(1)
    })
})
