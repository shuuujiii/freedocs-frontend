import React from 'react'
import { render, screen, wtFor } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'

import * as Auth from '../../provider/authProvider'
import Comments from './comments'
// import { AuthContext } from '../../provider/authProvider'
import mockAxios from 'axios'

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
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve({
                data: [
                    {
                        "children": [{
                            "children": [],
                            "_id": "60a344b6f8e43114eaf0428b",
                            "article": "60a22cb0f8e43114eaf0427b",
                            "comment": "replied to first comment",
                            "user": "609e4f2efca1e2737975bbdf",
                            "parent": "60a344adf8e43114eaf0428a",
                            "depth": 2,
                            "createdAt": "2021-05-18T04:38:14.260Z",
                            "updatedAt": "2021-05-18T04:38:14.260Z", "__v": 0
                        }],
                        "_id": "60a344adf8e43114eaf0428a",
                        "article": "60a22cb0f8e43114eaf0427b",
                        "comment": "first comment",
                        "user": "609e4f2efca1e2737975bbdf",
                        "parent": null,
                        "depth": 1,
                        "createdAt": "2021-05-18T04:38:05.329Z",
                        "updatedAt": "2021-05-18T04:38:14.263Z", "__v": 0
                    },
                    {
                        "children": [],
                        "_id": "60a344c2f8e43114eaf0428c",
                        "article": "60a22cb0f8e43114eaf0427b",
                        "comment": "second comment",
                        "user": "609e4f2efca1e2737975bbdf",
                        "parent": null,
                        "depth": 1,
                        "createdAt": "2021-05-18T04:38:26.351Z",
                        "updatedAt": "2021-05-18T04:38:26.351Z", "__v": 0
                    }]
            })
        })
        render(<Comments article_id={'60a22cb0f8e43114eaf0427b'} />)

        expect(await screen.findByText('first comment')).toBeInTheDocument()
        expect(await screen.findByText('second comment')).toBeInTheDocument()
        expect(await screen.findByText('replied to first comment')).toBeInTheDocument()
        expect(await screen.queryAllByTestId('comment-reply-button')).toHaveLength(3)

    })
})
