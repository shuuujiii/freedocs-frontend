import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react-hooks'
import ArticleCardDeleteButton from './ArticleCardDeleteButton'

describe('ArticleDeleteButton', () => {
    test('should render', async () => {
        render(
            <ArticleCardDeleteButton article_id={'articleid'} />
        )
        expect(screen.queryByTestId('article-card-delete-icon-button')).toBeInTheDocument()
        expect(screen.queryByTestId('delete-dialog')).toBe(null)
        userEvent.click(screen.getByTestId('article-card-delete-icon-button'))
        expect(await screen.findByTestId('delete-dialog')).toBeInTheDocument()
    })
})
