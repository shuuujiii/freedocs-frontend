import React from 'react'
import { render, screen, wtFor } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'

import * as Auth from '../../provider/authProvider'
import Comments from './comments'
// import { AuthContext } from '../../provider/authProvider'
import axios from 'axios'
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
describe('Comments', () => {
    test('should render', async () => {
        jest.spyOn(Auth, 'useAuth').mockImplementation(() => {
            return {
                authState: {
                    user: {
                        _id: 'user_id',
                        username: 'testuser'
                    }
                }
            }
        })
        axios.get.mockImplementation(() => {
            return Promise.resolve({
                data: [{
                    _id: '1',
                    user: 'u1',
                    article: 'a1',
                    parent: null,
                    // children: ['2','3'],
                    children: [],
                    comment: 'first comment',
                    depth: 0
                }]
            })
        })
        render(<Comments article_id={'1'} />)

        expect(await screen.findByText('first comment')).toBeInTheDocument()
        // screen.debug()

    })
})
