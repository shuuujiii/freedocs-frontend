import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateDialog from './CreateDialog'
import mockAxios from 'axios'
import * as Message from '../../provider/messageProvider';
import * as Error from '../../provider/errorProvider'
describe('CreateDialog', () => {
    const { location } = window;

    beforeAll(() => {
        delete window.location;
        window.location = { reload: jest.fn() };
    });

    afterAll(() => {
        window.location = location;
    });
    test('should render', () => {
        jest.spyOn(Error, 'useError').mockImplementation(() => {
            return {
                setError: jest.fn()
            }
        })
        const { getByTestId } = render(
            <CreateDialog open={true} setOpen={jest.fn()} />
        )
        expect(getByTestId('create-dialog-title')).toBeInTheDocument()
        expect(getByTestId('create-dialog-title')).toHaveTextContent('Add Post')
        expect(getByTestId('create-dialog-content-text')).toBeInTheDocument()
        expect(getByTestId('create-dialog-content-text')).toHaveTextContent('Please share your infomation about free documents for developers!')
        expect(getByTestId('tags')).toBeInTheDocument()
        expect(getByTestId('create-dialog-url-textfield')).toBeInTheDocument()
        expect(getByTestId('create-dialog-description-textfield')).toBeInTheDocument()
        expect(getByTestId('create-dialog-button')).toBeInTheDocument()
        expect(getByTestId('create-dialog-button')).toHaveTextContent('Add')
        expect(getByTestId('create-dialog-button').disabled).toBe(true)

        // expect(getByTestId('addcomment-button')).toBeInTheDocument()
    })

    test('should change values', () => {
        jest.spyOn(Error, 'useError').mockImplementation(() => {
            return {
                setError: jest.fn(),
                init: jest.fn()
            }
        })
        const { getByTestId } = render(
            <CreateDialog open={true} setOpen={jest.fn()} />
        )
        const urlInput = getByTestId('create-dialog-url-textfield').querySelector('input')
        const descriptionInput = getByTestId('create-dialog-description-textfield').querySelector('textarea')
        userEvent.type(urlInput, 'https://google.com')
        expect(urlInput).toHaveValue('https://google.com')
        userEvent.type(descriptionInput, 'description1{enter}description2{enter}description3');
        expect(descriptionInput).toHaveValue('description1\ndescription2\ndescription3')
        expect(getByTestId('create-dialog-button').disabled).toBe(false)
    })

    test('input invalid uri', () => {
        jest.spyOn(Error, 'useError').mockImplementation(() => {
            return {
                setError: jest.fn(),
                init: jest.fn()
            }
        })
        const { getByTestId } = render(
            <CreateDialog open={true} setOpen={jest.fn()} />
        )
        const urlInput = getByTestId('create-dialog-url-textfield').querySelector('input')
        const descriptionInput = getByTestId('create-dialog-description-textfield').querySelector('textarea')
        userEvent.type(urlInput, 'aaa')
        expect(urlInput).toHaveValue('aaa')
        userEvent.type(descriptionInput, 'description1{enter}description2{enter}description3');
        expect(descriptionInput).toHaveValue('description1\ndescription2\ndescription3')
        expect(getByTestId('create-dialog-uri-error')).toBeInTheDocument()
        expect(getByTestId('create-dialog-uri-error')).toHaveTextContent('"value" must be a valid uri')

        expect(getByTestId('create-dialog-button').disabled).toBe(true)
    })

    test('should post collectly', async () => {
        const message = jest.spyOn(Message, 'useMessage').mockImplementation(() => {
            return {
                successMessage: jest.fn()
            }
        })
        jest.spyOn(Error, 'useError').mockImplementation(() => {
            return {
                setError: jest.fn(),
                init: jest.fn()
            }
        })
        mockAxios.post.mockImplementation(() => {
            return Promise.resolve()
        })
        render(
            <CreateDialog open={true} setOpen={jest.fn()} />
        )

        const urlInput = screen.getByTestId('create-dialog-url-textfield').querySelector('input')
        const descriptionInput = screen.getByTestId('create-dialog-description-textfield').querySelector('textarea')
        userEvent.type(urlInput, 'https://google.com')
        userEvent.type(descriptionInput, 'description1{enter}description2{enter}description3');
        // screen.debug()

        act(() => {
            userEvent.click(screen.getByTestId('create-dialog-button'))
        })

        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(mockAxios.post).toHaveBeenCalledWith(
            `/article/create`, {
            tags: [],
            url: 'https://google.com',
            description: 'description1\ndescription2\ndescription3',
        })
        // await screen
        expect(await screen.findByTestId('create-dialog-url-textfield')).toBeInTheDocument()
        expect(await urlInput).toHaveValue('')
        expect(await screen.findByTestId('create-dialog-description-textfield')).toBeInTheDocument()
        expect(await descriptionInput).toHaveValue('')
    })

    test(' post duplicate url and get error message', async () => {
        jest.spyOn(Error, 'useError').mockImplementation(() => {
            return {
                setError: jest.fn(),
                init: jest.fn()
            }
        })
        const message = jest.spyOn(Message, 'useMessage').mockImplementation(() => {
            return {
                successMessage: jest.fn()
            }
        })
        mockAxios.post.mockImplementation(() => {
            return Promise.reject({
                response: {
                    data: {
                        message: 'duplicate url'
                    }
                }
            })
        })
        const { getByTestId } = render(
            <CreateDialog open={true} setOpen={jest.fn()} />
        )
        const urlInput = getByTestId('create-dialog-url-textfield').querySelector('input')
        const descriptionInput = getByTestId('create-dialog-description-textfield').querySelector('textarea')
        userEvent.type(urlInput, 'https://google.com')
        userEvent.type(descriptionInput, 'description1{enter}description2{enter}description3');
        userEvent.click(getByTestId('create-dialog-button'))
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(mockAxios.post).toHaveBeenCalledWith(
            `/article/create`, {
            tags: [],
            url: 'https://google.com',
            description: 'description1\ndescription2\ndescription3',
        })
        expect(await screen.findByText('duplicate url')).toBeInTheDocument()
    })
    test('post networkerror or something', async () => {
        jest.spyOn(Error, 'useError').mockImplementation(() => {
            return {
                setError: jest.fn(),
                init: jest.fn()
            }
        })
        const message = jest.spyOn(Message, 'useMessage').mockImplementation(() => {
            return {
                successMessage: jest.fn()
            }
        })
        mockAxios.post.mockImplementation(() => {
            return Promise.reject({})
        })
        const { getByTestId } = render(
            <CreateDialog open={true} setOpen={jest.fn()} />
        )
        const urlInput = getByTestId('create-dialog-url-textfield').querySelector('input')
        const descriptionInput = getByTestId('create-dialog-description-textfield').querySelector('textarea')
        userEvent.type(urlInput, 'https://google.com')
        userEvent.type(descriptionInput, 'description1{enter}description2{enter}description3');
        act(() => {
            userEvent.click(getByTestId('create-dialog-button'))
        })
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(mockAxios.post).toHaveBeenCalledWith(
            `/article/create`, {
            tags: [],
            url: 'https://google.com',
            description: 'description1\ndescription2\ndescription3',
        })
        expect(await screen.findByText('sorry something wrong...')).toBeInTheDocument()
    })
})
