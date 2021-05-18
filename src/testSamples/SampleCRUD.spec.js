import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import SampleCRUD from './SampleCRUD'
jest.mock("axios", () => ({
    post: jest.fn((_url, _body) => {
        url = _url
        body = _body
        return Promise.resolve({ data: { _id: '1', name: 'tagname' } });
    }),
    get: jest.fn((_url, _body) => {
        return Promise.resolve({ _url, _body });
    }),
    create: jest.fn(function () {
        return this;
    })
}));

describe('Sample', () => {
    test('should render', async () => {
        axios.get.mockImplementation(() => {
            return Promise.resolve({
                data: [{ _id: 1, name: 'test1' }, { _id: 2, name: 'test2' }]
            })
        })
        render(<SampleCRUD />)
        expect(await screen.findByText('test1')).toBeInTheDocument()
        expect(await screen.findByText('test2')).toBeInTheDocument()
        // expect(await screen.findByText('test3')).not.toBeInTheDocument()
        // screen.debug()
        // await expect(screen.getByText('test1')).toBeInTheDocument()
    })

})
