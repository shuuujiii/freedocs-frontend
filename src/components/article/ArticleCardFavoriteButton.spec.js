import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ArticleCardFavoriteButton from './ArticleCardFavoriteButton'
import mockAxios from 'axios'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));
const user = { _id: 'test-user-id' }
const articleId = 'testarticleid'
const userFavData = {
    data: {
        users: ['user1', 'user2', 'user3', user._id],
        article: articleId
    }
}
const userNotFavData = {
    data: {
        users: ['user1', 'user2', 'user3',],
        article: articleId
    }
}
describe.only('ArticleCardFavoriteButton', () => {
    afterEach(cleanup)

    test('should render user favorite', async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(userFavData)
        })
        render(
            <ArticleCardFavoriteButton
                user={user}
                article_id={articleId}
            />
        )
        expect(await screen.findByTestId('article-card-favorite-icon-button')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-favorite-icon-button')).toHaveClass('MuiIconButton-colorSecondary')
        expect(await screen.findByTestId('article-card-favorite-badge')).toHaveTextContent('4')
    })
    test("should render user doesn't favorite", async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(userNotFavData)
        })
        render(
            <ArticleCardFavoriteButton
                user={user}
                article_id={articleId}
            />
        )
        expect(await screen.findByTestId('article-card-favorite-icon-button')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-favorite-icon-button')).not.toHaveClass('MuiIconButton-colorSecondary')
        expect(await screen.findByTestId('article-card-favorite-badge')).toHaveTextContent('3')
    })
    test('authenticated user click button', async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(userNotFavData)
        })
        mockAxios.post.mockImplementation(() => {
            return Promise.resolve(userFavData)
        })
        render(
            <ArticleCardFavoriteButton
                user={user}
                article_id={articleId}
            />
        )
        userEvent.click(screen.getByTestId('article-card-favorite-icon-button'))
        expect(await screen.findByTestId('article-card-favorite-icon-button')).toBeInTheDocument()
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(mockAxios.post).toHaveBeenCalledWith('/article/likes', {
            _id: articleId
        })
    })
    test('not authenticated user click button', async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(userNotFavData)
        })
        render(
            <ArticleCardFavoriteButton
                user={null}
                article_id={articleId}
            />
        )
        expect(await screen.findByTestId('article-card-favorite-icon-button')).toBeInTheDocument()
        userEvent.click(screen.getByTestId('article-card-favorite-icon-button'))
        expect(mockHistoryPush).toHaveBeenCalledTimes(1)
        expect(mockHistoryPush).toHaveBeenCalledWith('/signin')
    })

})
