import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ArticleCardFavoriteButton from './ArticleCardFavoriteButton'
import mockAxios from 'axios'
const mockSetArticles = jest.fn()
const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));
const user = { _id: 'test-user-id' }
const articleId = 'testarticleid'
const userFavData = ['user1', 'user2', 'user3', user._id]
const userNotFavData = ['user1', 'user2', 'user3',]
describe('ArticleCardFavoriteButton', () => {
    afterEach(cleanup)

    test('should render user favorite', async () => {
        render(
            <ArticleCardFavoriteButton
                user={user}
                article_id={articleId}
                favoriteUsers={userFavData}
                setArticles={mockSetArticles}
            />
        )
        expect(await screen.findByTestId('article-card-favorite-icon-button')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-favorite-icon-button')).toHaveClass('MuiIconButton-colorSecondary')
        expect(await screen.findByTestId('article-card-favorite-badge')).toHaveTextContent('4')
    })
    test("should render user doesn't favorite", async () => {
        render(
            <ArticleCardFavoriteButton
                user={user}
                article_id={articleId}
                favoriteUsers={userNotFavData}
                setArticles={mockSetArticles}
            />
        )
        expect(await screen.findByTestId('article-card-favorite-icon-button')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-favorite-icon-button')).not.toHaveClass('MuiIconButton-colorSecondary')
        expect(await screen.findByTestId('article-card-favorite-badge')).toHaveTextContent('3')
    })
    test('when authenticated user click button then post to api', async () => {
        mockAxios.post.mockImplementation(() => {
            return Promise.resolve(userFavData)
        })
        render(
            <ArticleCardFavoriteButton
                user={user}
                article_id={articleId}
                favoriteUsers={userNotFavData}
                setArticles={mockSetArticles}
            />
        )
        userEvent.click(screen.getByTestId('article-card-favorite-icon-button'))
        expect(await screen.findByTestId('article-card-favorite-icon-button')).toBeInTheDocument()
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(mockAxios.post).toHaveBeenCalledWith('/article/likes', {
            _id: articleId
        })
    })
    test('if not authenticated user click button then push signin', async () => {
        render(
            <ArticleCardFavoriteButton
                user={null}
                article_id={articleId}
                favoriteUsers={userNotFavData}
                setArticles={mockSetArticles}
            />
        )
        expect(await screen.findByTestId('article-card-favorite-icon-button')).toBeInTheDocument()
        userEvent.click(screen.getByTestId('article-card-favorite-icon-button'))
        expect(mockHistoryPush).toHaveBeenCalledTimes(1)
        expect(mockHistoryPush).toHaveBeenCalledWith('/signin')
    })

})
