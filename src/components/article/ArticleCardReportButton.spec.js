import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react-hooks'
import ArticleCardReportButton from './ArticleCardReportButton'
const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));
describe('ArticleCardReportButton', () => {
    test('should render to login user and open report dialog', async () => {
        render(
            <ArticleCardReportButton user={{ _id: 'testuserid' }} article_id={'articleid'} />
        )
        expect(screen.queryByTestId('article-card-report-icon-button')).toBeInTheDocument()
        expect(screen.queryByTestId('report-form-dialog')).toBe(null)
        userEvent.click(screen.getByTestId('article-card-report-icon-button'))
        expect(await screen.findByTestId('report-form-dialog')).toBeInTheDocument()
    })
    test('should render to guest user and go to sign in page if clicked', async () => {
        render(
            <ArticleCardReportButton user={null} article_id={'articleid'} />
        )
        expect(screen.queryByTestId('article-card-report-icon-button')).toBeInTheDocument()
        expect(screen.queryByTestId('report-form-dialog')).toBe(null)
        userEvent.click(screen.getByTestId('article-card-report-icon-button'))
        expect(mockHistoryPush).toHaveBeenCalledTimes(1)
        expect(mockHistoryPush).toHaveBeenCalledWith('/signin')
    })
})
