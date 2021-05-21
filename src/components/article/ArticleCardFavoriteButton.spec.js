import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockAxios from 'axios'
import ArticleCardFavoriteButton from './ArticleCardFavoriteButton'
const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));
const setArticles = jest.fn()

describe('ArticleCardFavoriteButton', () => {
    test('should render user favorite', () => {
        render(
            <ArticleCardFavoriteButton
                user={{ _id: 'testuserid' }}
                article_id={'testarticleid'}
                likes={['testuserid', 'otheruserid']}
                setArticles={setArticles}
            />
        )
        expect(screen.getByTestId('article-card-favorite-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-favorite-icon-button')).toHaveClass('MuiIconButton-colorSecondary')
        expect(screen.getByTestId('article-card-favorite-badge')).toHaveTextContent('2')

    })
    test("should render user doesn't favorite", () => {
        render(
            <ArticleCardFavoriteButton
                user={{ _id: 'testuserid' }}
                article_id={'testarticleid'}
                likes={['otheruserid', 'otheruserid2', 'otheruserid3']}
                setArticles={setArticles}
            />
        )
        expect(screen.getByTestId('article-card-favorite-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-favorite-icon-button')).not.toHaveClass('MuiIconButton-colorSecondary')
        expect(screen.getByTestId('article-card-favorite-badge')).toHaveTextContent('3')
    })
    test('authenticated user click button', async () => {
        render(
            <ArticleCardFavoriteButton
                user={{ _id: 'testuserid' }}
                article_id={'testarticleid'}
                likes={['otheruserid', 'otheruserid2', 'otheruserid3']}
                setArticles={setArticles}
            />
        )
        mockAxios.post.mockImplementation(() => { return Promise.resolve() })
        userEvent.click(screen.getByTestId('article-card-favorite-icon-button'))
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(mockAxios.post).toHaveBeenCalledWith('/article/likes', {
            _id: 'testarticleid'
        })
        expect(await setArticles).toHaveBeenCalledTimes(1)
    })
    test('not authenticated user click button', async () => {
        render(
            <ArticleCardFavoriteButton
                user={null}
                article_id={'testarticleid'}
                likes={['otheruserid', 'otheruserid2', 'otheruserid3']}
                setArticles={setArticles}
            />
        )
        userEvent.click(screen.getByTestId('article-card-favorite-icon-button'))
        expect(mockHistoryPush).toHaveBeenCalledTimes(1)
        expect(mockHistoryPush).toHaveBeenCalledWith('/signin')
    })

})
