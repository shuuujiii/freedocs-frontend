import React from 'react';
import { render, screen, fireEvent, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReportDialog from './Report'
import { act, renderHook } from '@testing-library/react-hooks';

import axios from 'axios';
// import axiosbase from '../../utils/axiosbase'

import * as Messages from '../../provider/messageProvider';
import * as Errors from '../../provider/errorProvider'
import { useError } from '../../provider/errorProvider'
// https://qiita.com/ossan-engineer/items/4757d7457fafd44d2d2f
// jest.mock('axios');
jest.mock("axios", () => ({
    post: jest.fn((_url, _body) => {
        url = _url
        body = _body
        return Promise.resolve();
    }),
    create: jest.fn(function () {
        return this;
    })
}));

describe('Report', () => {
    test('should render Report', () => {
        const { getByTestId, getByText } = render(<ReportDialog open={true} handleClose={jest.fn()} article_id={'1243'} />)
        expect(getByTestId('report-title')).toHaveTextContent('Report');
        expect(getByText('Sexual content')).toBeInTheDocument();
        expect(getByText('Violent or repulsive content')).toBeInTheDocument();
        expect(getByText('Hateful or abusive content')).toBeInTheDocument();
        expect(getByText('Spam or misleading')).toBeInTheDocument();
        expect(getByText('About Tag')).toBeInTheDocument();
        expect(getByText('About URL')).toBeInTheDocument();
        expect(getByText('Others')).toBeInTheDocument();
        expect(getByTestId('report-text')).toBeInTheDocument();
        expect(getByTestId('report-cancel-button')).toBeInTheDocument();
        expect(getByTestId('report-cancel-button')).toHaveTextContent('Cancel');
        expect(getByTestId('report-send-button')).toBeInTheDocument();
        expect(getByTestId('report-send-button')).toHaveTextContent('Send');
    })

    test('should select reason when clicked', () => {
        const { getByTestId, getByText } = render(<ReportDialog open={true} handleClose={jest.fn()} article_id={'1243'} />)
        const radio_sex = getByTestId('radio-button-sex')
        const radio_violent = getByTestId('radio-button-violent')
        const radio_hateful = getByTestId('radio-button-hateful')
        const radio_spam = getByTestId('radio-button-spam')
        const radio_tag = getByTestId('radio-button-tag')
        const radio_url = getByTestId('radio-button-url')
        const radio_others = getByTestId('radio-button-others')

        // default
        expect(radio_sex.checked).toBe(false);
        expect(radio_violent.checked).toBe(false);
        expect(radio_hateful.checked).toBe(false);
        expect(radio_spam.checked).toBe(false);
        expect(radio_tag.checked).toBe(false);
        expect(radio_url.checked).toBe(false);
        expect(radio_others.checked).toBe(true);

        act(() => {
            userEvent.click(radio_sex)
        })
        expect(radio_sex.checked).toBe(true);
        expect(radio_violent.checked).toBe(false);
        expect(radio_hateful.checked).toBe(false);
        expect(radio_spam.checked).toBe(false);
        expect(radio_tag.checked).toBe(false);
        expect(radio_url.checked).toBe(false);
        expect(radio_others.checked).toBe(false);
    })
    test('should change text', () => {
        const { getByTestId } = render(<ReportDialog open={true} handleClose={jest.fn()} article_id={'1243'} />)
        const reportText = getByTestId('report-text').querySelector('textarea')
        const reportLabel = getByTestId('report-text').querySelector('label')
        expect(reportLabel).toHaveTextContent('detail')
        userEvent.type(reportText, 'report reason');
        expect(reportText).toHaveTextContent('report reason')
    })
    test('should input multiline text', () => {
        const { getByTestId } = render(<ReportDialog open={true} handleClose={jest.fn()} article_id={'1243'} />)
        const reportText = getByTestId('report-text').querySelector('textarea')
        userEvent.type(reportText, 'report reason{enter}reason1{enter}reason2');
        expect(reportText).toHaveValue('report reason\nreason1\nreason2')
    })
    test('should call axios post', () => {
        const { getByTestId } = render(
            <Errors.ErrorContext.Provider value={{ setError: jest.fn() }}>
                <Messages.MessageContext.Provider value={{ successMessage: jest.fn() }}>
                    <ReportDialog open={true} handleClose={jest.fn()} article_id={'1243'} />
                </Messages.MessageContext.Provider>
            </Errors.ErrorContext.Provider>
        )
        jest.spyOn(Errors, 'useError').mockImplementation(() => {
            return {
                setError: jest.fn()
            }
        })
        // why it doesn't work ???
        // jest.spyOn(Messages, 'useMessagyarn e').mockImplementation(() => {
        //     return {
        //         successMessage: jest.fn()
        //     }
        // })

        const response = 'response'
        axios.post.mockResolvedValue(response)
        act(() => {
            userEvent.click(getByTestId('report-send-button'))
        })
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            `/report`, { "id": '1243', "title": "other", "detail": "" },
        );
    })

});