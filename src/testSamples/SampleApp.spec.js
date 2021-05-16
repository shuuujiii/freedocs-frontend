import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './SampleApp';
import { Search, GetDataApp } from './SampleApp'
import { act, renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
// https://qiita.com/ossan-engineer/items/4757d7457fafd44d2d2f
jest.mock('axios');

// describe('App', () => {
//     test('renders App component', () => {
//         render(<App />);

//         // screen.getByText('Search:');
//         // expect(screen.getByText('Search:')).toBeInTheDocument();

//         // fails
//         // expect(screen.getByText('Search')).toBeInTheDocument();

//         // succeeds
//         expect(screen.getByText('Search:')).toBeInTheDocument();

//         // succeeds
//         expect(screen.getByText(/Search/)).toBeInTheDocument();

//         expect(screen.getByRole('textbox')).toBeInTheDocument();
//     });
// });

describe('App with useEffect', () => {
    test('renders App component', async () => {
        render(<App />);

        expect(screen.queryByText(/Signed in as/)).toBeNull();

        expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
    });
    test('renders App component', async () => {
        render(<App />);

        // wait for the user to resolve
        await screen.findByText(/Signed in as/);

        expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

        await userEvent.type(screen.getByRole('textbox'), 'JavaScript');

        expect(
            screen.getByText(/Searches for JavaScript/)
        ).toBeInTheDocument();
    });
});

describe('Search', () => {
    test('calls the onChange callback handler', () => {
        const onChange = jest.fn();

        render(
            <Search value="" onChange={onChange}>
                Search:
            </Search>
        );

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'JavaScript' },
        });

        expect(onChange).toHaveBeenCalledTimes(1);
    });
    test('calls the onChange callback handler', async () => {
        const onChange = jest.fn();

        render(
            <Search value="" onChange={onChange}>
                Search:
            </Search>
        );

        await userEvent.type(screen.getByRole('textbox'), 'JavaScript');

        expect(onChange).toHaveBeenCalledTimes(10);
    });
});


describe('GetDataApp', () => {
    test('fetches stories from an API and displays them', async () => {
        const stories = [
            { objectID: '1', title: 'Hello' },
            { objectID: '2', title: 'React' },
        ];

        axios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: { hits: stories } })
        );

        render(<GetDataApp />);


        act(() => {
            userEvent.click(screen.getByRole('button'));
        })

        const items = await screen.findAllByRole('listitem');

        expect(items).toHaveLength(2);
    });
    test('fetches stories from an API and fails', async () => {
        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error())
        );

        render(<GetDataApp />);

        act(() => {
            userEvent.click(screen.getByRole('button'));
        })

        const message = await screen.findByText(/Something went wrong/);

        expect(message).toBeInTheDocument();
    });
});