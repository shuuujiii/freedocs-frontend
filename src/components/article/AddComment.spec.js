import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddComment from './AddComment'
import mockAxios from 'axios'

describe('AddComment', () => {
    test('should render', () => {
        const { getByTestId } = render(
            <AddComment />
        )
        expect(getByTestId('addcomment-textfield')).toBeInTheDocument()
        expect(getByTestId('addcomment-button')).toBeInTheDocument()
    })
    test('should input comment', () => {
        const { getByTestId } = render(
            <AddComment article_id={'1'} setComments={jest.fn()} />
        )
        act(() => {
            userEvent.type(getByTestId('addcomment-textfield').querySelector('textarea'), 'comment added')
        })
        // screen.debug()
        expect(getByTestId('addcomment-textfield').querySelector('textarea')).toHaveValue('comment added')
    })

    test('should post comment', async () => {
        const setComments = jest.fn()
        const { getByTestId } = render(
            <AddComment article_id={'1'} setComments={setComments} />
        )
        mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({ data: 'test' })
        })
        userEvent.type(getByTestId('addcomment-textfield').querySelector('textarea'), 'comment added')

        act(() => {
            userEvent.click(getByTestId('addcomment-button'))
        })
        // screen.debug()
        // expect(getByTestId('addcomment-textfield').querySelector('textarea')).toHaveValue('comment added')
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(mockAxios.post).toHaveBeenCalledWith(
            `/article/comment`, {
            article_id: '1',
            parent_id: null,
            comment: 'comment added',
        },
        );
        expect(getByTestId('addcomment-textfield').querySelector('textarea')).toHaveValue('')
    })

})
