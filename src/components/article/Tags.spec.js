import React from 'react'
import { getByRole, render, screen, fireEvent, findByTestId, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react-hooks'
import { Tags } from './Tags'
import axios from 'axios'
// import { act as utilAct } from 'react-dom/test-utils';
import * as Errors from '../../provider/errorProvider'

jest.mock("axios", () => ({
    post: jest.fn((_url, _body) => {
        url = _url
        body = _body
        return Promise.resolve({ data: { _id: '1', name: 'tagname' } });
    }),
    create: jest.fn(function () {
        return this;
    })
}));
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
    test('Tags posted collectly', async () => {
        const tags = []
        const setTags = jest.fn()
        const setError = jest.fn()
        const { getByTestId, queryAllByTestId, getByRole } = render(
            <Errors.ErrorContext.Provider value={{ init: jest.fn(), setError: setError }}>
                <Tags tags={tags} setTags={setTags} setInputTag={jest.fn()} />
            </Errors.ErrorContext.Provider>
        )
        axios.post.mockImplementation(() => { return Promise.resolve({ data: { _id: '1', name: 'tagname' } }) });
        act(() => {
            userEvent.type(getByTestId('tag-textfield').querySelector('input'), 'tag4{enter}')
        })
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            `/tag`, { name: 'tag4' },
        );
        expect(getByTestId('tag-textfield').querySelector('input')).toHaveValue('')
    })

})