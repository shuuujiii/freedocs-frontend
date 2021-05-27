import { getByTestId, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react-hooks'
import mockAxios from 'axios'
import * as Auth from '../../provider/authProvider'
import ArticleCard from './articleCard'
import { MemoryRouter } from 'react-router-dom';

const mockArticle = {
    "_id": "mockArticleId",
    "tags": [
        {
            "_id": "6077eac230d6b5377f5e862d",
            "name": "aaa",
            "__v": 0
        },
        {
            "_id": "6077eb4b30d6b5377f5e862f",
            "name": "bbb",
            "__v": 0
        },
    ],
    "url": "http://google.com",
    "description": "mock description",
    "user": "609e4f2efca1e2737975bbdf",
    "createdAt": "2021-05-17T08:34:26.827Z",
    "updatedAt": "2021-05-17T08:34:26.827Z",
    upvoteUsers: [],
    downvoteUsers: [],
    favoriteUsers: [],
    author: "authorUser",
}
const mockAuthorArticle = {
    _id: "60a22a92f8e43114eaf04270",
    tags: [],
    url: "http://google.com",
    description: "mock description",
    user: "authorUserId",
    createdAt: "2021-05-17T08:34:26.827Z",
    updatedAt: "2021-05-17T08:34:26.827Z",
    upvoteUsers: [],
    downvoteUsers: [],
    favoriteUsers: [],
    author: "AuthorUser",
    // likes: [],
    // likeCount: 0
}
const setArticles = jest.fn()
// jest.mock('./ArticleCardFavoriteButton', () => () => { return <div data-testid='mock-favorite-button'></div> })
// jest.mock('./ArticleVote', () => () => { return <div data-testid='mock-vote'></div> })

describe('ArticleCard', () => {
    beforeEach(() => {
        jest.spyOn(Auth, 'useAuth').mockImplementation(() => {
            return {
                authState: {
                    user: {
                        _id: 'authorUserId',
                        username: 'AuthorUser'
                    }
                }
            }
        })
    })
    afterAll(() => {
        jest.clearAllMocks()
    })
    test('should render for normal user', async () => {
        render(
            <MemoryRouter>
                <ArticleCard article={mockArticle} setArticles={setArticles} />
            </MemoryRouter>
        )
        expect(screen.getByTestId('article-card')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-vote')).toBeInTheDocument()
        expect(screen.getByTestId('tagchips')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-url-link')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-url-link')).toHaveTextContent('http://google.com')
        expect(screen.getByTestId('article-card-author')).toBeInTheDocument()
        // expect(screen.getByTestId('mock-favorite-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-favorite-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-comment-icon-button')).toBeInTheDocument()
        expect(screen.queryByTestId('article-card-edit-icon-button')).toBe(null)
        expect(screen.queryByTestId('article-card-delete-icon-button')).toBe(null)
        expect(screen.queryByTestId('article-card-description')).toBe(null)
        expect(screen.queryByTestId('article-card-comments')).toBe(null)
    })
    test('normal user click comment icon', async () => {
        mockAxios.get.mockImplementation(() => { return Promise.resolve({ data: [] }) })
        render(
            <MemoryRouter>
                <ArticleCard article={mockArticle} setArticles={setArticles} />
            </MemoryRouter>
        )
        expect(screen.queryByTestId('article-card-description')).toBe(null)
        expect(screen.queryByTestId('article-card-comments')).toBe(null)

        userEvent.click(screen.getByTestId('article-card-comment-icon-button'))
        expect(await screen.findByTestId('article-card-description')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-description')).toHaveTextContent('mock description')
        expect(await screen.findByTestId('article-card-comments')).toBeInTheDocument()

    })
    test('should render for author user', async () => {
        render(
            <MemoryRouter>
                <ArticleCard article={mockAuthorArticle} setArticles={setArticles} />
            </MemoryRouter>
        )
        expect(screen.getByTestId('article-card')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-vote')).toBeInTheDocument()
        expect(screen.getByTestId('tagchips')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-url-link')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-author-link')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-favorite-icon-button')).toBeInTheDocument()
        // expect(screen.getByTestId('mock-favorite-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-comment-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-edit-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-delete-icon-button')).toBeInTheDocument()
        expect(screen.queryByTestId('article-card-report-icon-button')).toBe(null)
        expect(screen.queryByTestId('article-card-description')).toBe(null)
        expect(screen.queryByTestId('article-card-comments')).toBe(null)
    })
})
