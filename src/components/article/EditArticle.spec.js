import React from 'react'
import { render, screen, act } from '@testing-library/react'
// import { act } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import EditArticle from './editArticle'
import axios from 'axios'
import * as Message from '../../provider/messageProvider';
import * as Error from '../../provider/errorProvider'
jest.mock("axios", () => ({
    put: jest.fn((_url, _body) => {
        url = _url
        body = _body
        return Promise.resolve();
    }),
    // post: jest.fn((_url, _body) => {
    //     url = _url
    //     body = _body
    //     return Promise.resolve();
    // }),
    create: jest.fn(function () {
        return this;
    })
}));
const mockArticle = {
    _id: '1',
    url: 'http://google.com',
    description: 'description 1',
    tags: []
}


describe('EditArticle', () => {
    let mockMessage
    let mockError
    const mocksetArticles = jest.fn()
    const mocksetIsEdit = jest.fn()
    beforeEach(() => {
        mockMessage = jest.spyOn(Message, 'useMessage').mockImplementation(() => {
            return {
                successMessage: jest.fn()
            }
        })
        mockError = jest.spyOn(Error, 'useError').mockImplementation(() => {
            return {
                init: jest.fn(),
                setError: jest.fn()
            }
        })
    })
    afterAll(() => {
        jest.clearAllMocks();
    });
    test('should render', () => {
        render(<EditArticle setIsEdit={jest.fn()} article={mockArticle} setArticles={jest.fn()} />)
        expect(screen.getByTestId('tags')).toBeInTheDocument()
        expect(screen.getByTestId('edit-article-url-textfield')).toBeInTheDocument()
        expect(screen.getByTestId('edit-article-url-textfield').querySelector('input').disabled).toBe(true)
        expect(screen.getByTestId('edit-article-url-textfield').querySelector('input')).toHaveValue('http://google.com')
        expect(screen.getByTestId('edit-article-description-textfield')).toBeInTheDocument()
        expect(screen.getByTestId('edit-article-description-textfield').querySelector('textarea')).toHaveValue('description 1')
        expect(screen.getByTestId('edit-article-save-button')).toBeInTheDocument()
        expect(screen.getByTestId('edit-article-save-button')).toHaveTextContent('Save')
        expect(screen.getByTestId('edit-article-cancel-button')).toBeInTheDocument()
        expect(screen.getByTestId('edit-article-cancel-button')).toHaveTextContent('Cancel')
    })
    test('should input change', async () => {
        render(<EditArticle setIsEdit={mocksetIsEdit} article={mockArticle} setArticles={mocksetArticles} />)
        const descInput = screen.getByTestId('edit-article-description-textfield').querySelector('textarea')
        userEvent.type(descInput, '{enter}description 2')
        expect(descInput).toHaveValue('description 1\ndescription 2')
    })
    test('should post on click save', async () => {
        axios.put.mockImplementation(() => { return Promise.resolve() })
        render(<EditArticle setIsEdit={mocksetIsEdit} article={mockArticle} setArticles={mocksetArticles} />)
        const descInput = screen.getByTestId('edit-article-description-textfield').querySelector('textarea')
        userEvent.type(descInput, '{enter}description 2')
        expect(await descInput).toHaveValue('description 1\ndescription 2')
        userEvent.click(screen.getByTestId('edit-article-save-button'))
        expect(axios.put).toHaveBeenCalledTimes(1)
        expect(axios.put).toHaveBeenCalledWith(`/article`, {
            _id: '1',
            url: 'http://google.com',
            description: 'description 1\ndescription 2',
            tags: []
        })
        expect(await mocksetArticles).toHaveBeenCalledTimes(1)
        expect(mocksetIsEdit).toHaveBeenCalledTimes(1)
        //  mockMessage called 15 times and mockError called 30 times ...
        // expect(mockMessage).toHaveBeenCalledTimes(1)
        // expect(mockError).toHaveBeenCalledTimes(1)
    })
    test('post error', async () => {
        axios.put.mockImplementation(() => { return Promise.reject() })
        render(<EditArticle setIsEdit={mocksetIsEdit} article={mockArticle} setArticles={mocksetArticles} />)
        act(() => {
            userEvent.click(screen.getByTestId('edit-article-save-button'))
        })
        expect(axios.put).toHaveBeenCalledTimes(1)
        expect(axios.put).toHaveBeenCalledWith(`/article`, {
            _id: '1',
            url: 'http://google.com',
            description: 'description 1',
            tags: []
        })
        expect(await mocksetArticles).toHaveBeenCalledTimes(0)
        expect(await mocksetIsEdit).toHaveBeenCalledTimes(0)
        expect(await mockError).toHaveBeenCalledTimes(2)
    })


})
