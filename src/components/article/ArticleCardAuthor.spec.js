import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ArticleCardAuthor from './ArticleCardAuthor'
import moment from 'moment'
import { MemoryRouter } from 'react-router-dom'
describe('ArticleCardAuthor', () => {
    test('should render', () => {
        const createdAt = "2021-05-17T08:34:26.827Z"
        render(
            <MemoryRouter>
                <ArticleCardAuthor author={'testAuthor'} createdAt={createdAt} />
            </MemoryRouter>
        )
        expect(screen.getByTestId('article-card-author-link')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-author-link')).toHaveTextContent('@testAuthor')
        expect(screen.getByTestId('article-card-author-link')).toHaveProperty('href', 'http://localhost/profile/testAuthor')
        expect(screen.getByTestId('article-card-added-moment')).toBeInTheDocument()
        const showMoment = moment(createdAt).fromNow()
        expect(screen.getByTestId('article-card-added-moment')).toHaveTextContent(`added ${showMoment}`)
    })

})
