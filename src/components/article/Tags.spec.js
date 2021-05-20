import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react-hooks'
import { Tags } from './Tags'
import mockAxios from 'axios'
// import { act as utilAct } from 'react-dom/test-utils';
import * as Errors from '../../provider/errorProvider'

describe('Tags', () => {
    test('Tags layout with tags', () => {
        const tags = [{ _id: '1', name: 'tag1' }, { _id: '2', name: 'tag2' }]
        const setTags = jest.fn()
        const { getByTestId, getByText, getAllByTestId, getAllByRole } = render(<Tags tags={tags} setTags={setTags} />)
        expect(getAllByTestId('tag-chip')).toHaveLength(2)
        expect(getByText('tag1')).toBeInTheDocument()
        expect(getByText('tag2')).toBeInTheDocument()
        expect(getAllByRole('button')).toHaveLength(2)
        expect(getByTestId('tag-textfield')).toBeInTheDocument()
    })
    test('Tags layout with no tags', () => {
        const tags = []
        const setTags = jest.fn()
        const { getByTestId, queryAllByTestId } = render(<Tags tags={tags} setTags={setTags} />)
        expect(queryAllByTestId('tag-chip')).toHaveLength(0)
        expect(getByTestId('tag-textfield')).toBeInTheDocument()

    })
    test('Tags layout with no tags', () => {
        const tags = []
        const setTags = jest.fn()
        const { getByTestId, queryAllByTestId } = render(<Tags tags={tags} setTags={setTags} />)
        expect(queryAllByTestId('tag-chip')).toHaveLength(0)
        expect(getByTestId('tag-textfield')).toBeInTheDocument()
    })
    test('Tags input changed', () => {
        const tags = []
        const setTags = jest.fn()
        const { getByTestId, queryAllByTestId, getByRole } = render(
            <Errors.ErrorContext.Provider value={{ init: jest.fn(), setError: jest.fn() }}>
                <Tags tags={tags} setTags={setTags} />
            </Errors.ErrorContext.Provider>
        )
        act(() => {
            userEvent.type(getByTestId('tag-textfield').querySelector('input'), 'tag3')
        })
        expect(getByTestId('tag-textfield').querySelector('input')).toHaveValue('tag3')
    })
    test('Tags post', async () => {
        const tags = []
        const setTags = jest.fn()
        const setError = jest.fn()
        const { getByTestId, } = render(
            <Errors.ErrorContext.Provider value={{ init: jest.fn(), setError: setError }}>
                <Tags tags={tags} setTags={setTags} setInputTag={jest.fn()} />
            </Errors.ErrorContext.Provider>
        )
        mockAxios.post.mockImplementation(() => { return Promise.resolve({ data: { _id: '1', name: 'tagname' } }) });
        userEvent.type(getByTestId('tag-textfield').querySelector('input'), 'tag4{enter}')
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(
            `/tag`, { name: 'tag4' },
        );
        expect(await getByTestId('tag-textfield').querySelector('input')).toHaveValue('')
    })

})