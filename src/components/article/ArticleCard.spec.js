import { getByTestId, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react-hooks'
import mockAxios from 'axios'
import * as Auth from '../../provider/authProvider'
import ArticleCard from './articleCard'
import { MemoryRouter } from 'react-router-dom';
// const mockHistoryPush = jest.fn()
// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useHistory: () => ({
//         push: mockHistoryPush,
//     }),
// }));
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
    "votes": {
        "_id": "60a22a92f8e43114eaf04272",
        "upvoteUsers": ['a', 'b', 'c', 'd'],
        "downvoteUsers": ['e'],
        "article": "60a22a92f8e43114eaf04270",
        "__v": 0
    },
    author: "authorUser",
    likes: ['likea', 'likeb'],
    likeCount: 2
}
const mockAuthorArticle = {
    "_id": "authorUserId",
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
    "user": "authorUserId",
    "createdAt": "2021-05-17T08:34:26.827Z",
    "updatedAt": "2021-05-17T08:34:26.827Z",
    "votes": {
        "_id": "60a22a92f8e43114eaf04272",
        "upvoteUsers": [],
        "downvoteUsers": [],
        "article": "60a22a92f8e43114eaf04270",
        "__v": 0
    },
    author: "AuthorUser",
    likes: [],
    likeCount: 0
}
const setArticles = jest.fn()
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
    test('should render for normal user', async () => {
        render(
            <MemoryRouter>
                <ArticleCard article={mockArticle} setArticles={setArticles} />
            </MemoryRouter>
        )
        expect(screen.getByTestId('article-card')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-vote-count')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-vote-count')).toHaveTextContent('3')
        expect(screen.getByTestId('article-card-votes')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-votes')).toHaveTextContent('Votes')
        expect(screen.getByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('tagchips')).toBeInTheDocument()
        expect(screen.getByText('aaa')).toBeInTheDocument()
        expect(screen.getByText('bbb')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-url-link')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-url-link')).toHaveTextContent('http://google.com')
        expect(screen.getByTestId('article-card-author-link')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-author-link')).toHaveTextContent('authorUser')
        expect(screen.getByTestId('article-card-added-moment')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-favorite-icon-button')).toBeInTheDocument()
        expect(screen.queryByTestId('article-card-favorite-badge')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-favorite-badge').querySelector('span')).toHaveTextContent('2')
        expect(screen.getByTestId('article-card-comment-icon-button')).toBeInTheDocument()
        expect(screen.queryByTestId('article-card-edit-icon-button')).toBe(null)
        expect(screen.queryByTestId('article-card-delete-icon-button')).toBe(null)
        expect(screen.getByTestId('article-card-report-icon-button')).toBeInTheDocument()
        expect(screen.queryByTestId('article-card-description')).toBe(null)
        expect(screen.queryByTestId('article-card-comments')).toBe(null)
        expect(screen.queryByTestId('report-form-dialog')).toBe(null)

        // userEvent.click(screen.getByTestId('article-card-comment-icon-button'))
        // expect(await screen.findByTestId('article-card-description')).toBeInTheDocument()
        // expect(await screen.findByTestId('article-card-comments')).toBeInTheDocument()

        // userEvent.click(screen.getByTestId('article-card-report-icon-button'))
        // expect(await screen.findByTestId('report-form-dialog')).toBeInTheDocument()
    })
    test('normal user click comment icon', async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve({
                data: [
                    {
                        "children": [{
                            "children": [],
                            "_id": "60a344b6f8e43114eaf0428b",
                            "article": "60a22cb0f8e43114eaf0427b",
                            "comment": "replied to first comment",
                            "user": "609e4f2efca1e2737975bbdf",
                            "parent": "60a344adf8e43114eaf0428a",
                            "depth": 2,
                            "createdAt": "2021-05-18T04:38:14.260Z",
                            "updatedAt": "2021-05-18T04:38:14.260Z", "__v": 0
                        }],
                        "_id": "60a344adf8e43114eaf0428a",
                        "article": "60a22cb0f8e43114eaf0427b",
                        "comment": "first comment",
                        "user": "609e4f2efca1e2737975bbdf",
                        "parent": null,
                        "depth": 1,
                        "createdAt": "2021-05-18T04:38:05.329Z",
                        "updatedAt": "2021-05-18T04:38:14.263Z", "__v": 0
                    },
                    {
                        "children": [],
                        "_id": "60a344c2f8e43114eaf0428c",
                        "article": "60a22cb0f8e43114eaf0427b",
                        "comment": "second comment",
                        "user": "609e4f2efca1e2737975bbdf",
                        "parent": null,
                        "depth": 1,
                        "createdAt": "2021-05-18T04:38:26.351Z",
                        "updatedAt": "2021-05-18T04:38:26.351Z", "__v": 0
                    }]
            })
        })
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

        // userEvent.click(screen.getByTestId('article-card-report-icon-button'))
        // expect(await screen.findByTestId('report-form-dialog')).toBeInTheDocument()
    })
    test('normal user click report icon', async () => {
        render(
            <MemoryRouter>
                <ArticleCard article={mockArticle} setArticles={setArticles} />
            </MemoryRouter>
        )
        expect(screen.queryByTestId('report-form-dialog')).toBe(null)
        userEvent.click(screen.getByTestId('article-card-report-icon-button'))
        expect(await screen.findByTestId('report-form-dialog')).toBeInTheDocument()
    })
    test('should render for author user', async () => {
        render(
            <MemoryRouter>
                <ArticleCard article={mockAuthorArticle} setArticles={setArticles} />
            </MemoryRouter>
        )
        expect(screen.getByTestId('article-card')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-vote-count')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-votes')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('tagchips')).toBeInTheDocument()
        expect(screen.getByText('aaa')).toBeInTheDocument()
        expect(screen.getByText('bbb')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-url-link')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-author-link')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-added-moment')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-favorite-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-comment-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-edit-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-delete-icon-button')).toBeInTheDocument()
        expect(screen.queryByTestId('article-card-report-icon-button')).toBe(null)
        expect(screen.queryByTestId('article-card-description')).toBe(null)
        expect(screen.queryByTestId('article-card-comments')).toBe(null)
        expect(screen.queryByTestId('edit-article')).toBe(null)

        userEvent.click(screen.getByTestId('article-card-edit-icon-button'))
        expect(await screen.findByTestId('edit-article')).toBeInTheDocument()

    })
    test('author user click edit icon', async () => {
        render(
            <MemoryRouter>
                <ArticleCard article={mockAuthorArticle} setArticles={setArticles} />
            </MemoryRouter>
        )
        expect(screen.queryByTestId('edit-article')).toBe(null)
        userEvent.click(screen.getByTestId('article-card-edit-icon-button'))
        expect(await screen.findByTestId('edit-article')).toBeInTheDocument()
    })
    test('author user click delete icon', async () => {
        render(
            <MemoryRouter>
                <ArticleCard article={mockAuthorArticle} setArticles={setArticles} />
            </MemoryRouter>
        )
        expect(screen.queryByTestId('delete-dialog')).toBe(null)
        userEvent.click(screen.getByTestId('article-card-delete-icon-button'))
        expect(await screen.findByTestId('delete-dialog')).toBeInTheDocument()
    })
    test('click favorite', async () => {
        render(
            <MemoryRouter>
                <ArticleCard article={mockArticle} setArticles={setArticles} />
            </MemoryRouter>)
        mockAxios.post.mockImplementation(() => {
            return Promise.resolve({
                data: {
                    _id: '1',
                    likes: ['authorUserId']
                }
            })
        })
        userEvent.click(screen.getByTestId('article-card-favorite-icon-button'))
        expect(await setArticles).toHaveBeenCalledTimes(1)
    })
    test('click upvote', async () => {
        render(
            <MemoryRouter>
                <ArticleCard article={mockArticle} setArticles={setArticles} />
            </MemoryRouter>)
        mockAxios.post.mockImplementation(() => {
            return Promise.resolve({
                data: {
                    _id: '1',
                    votes: {
                        upvoteUsers: [],
                        downvoteUsers: []
                    }
                }
            })
        })
        act(() => {
            userEvent.click(screen.getByTestId('article-card-upvote-icon-button'))
        })
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(mockAxios.post).toHaveBeenCalledWith('/article/upvote', {
            _id: 'mockArticleId',
        })
        expect(await setArticles).toHaveBeenCalledTimes(1)

    })
    test('click downvote', async () => {
        render(
            <MemoryRouter>
                <ArticleCard article={mockArticle} setArticles={setArticles} />
            </MemoryRouter>)
        mockAxios.post.mockImplementation(() => {
            return Promise.resolve({
                data: {
                    _id: '1',
                    votes: {
                        upvoteUsers: [],
                        downvoteUsers: []
                    }
                }
            })
        })
        act(() => {
            userEvent.click(screen.getByTestId('article-card-downvote-icon-button'))
        })
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(mockAxios.post).toHaveBeenCalledWith('/article/downvote', {
            _id: 'mockArticleId',
        })
        expect(await setArticles).toHaveBeenCalledTimes(1)
    })
    test('click author link', () => {
        render(
            <MemoryRouter>
                <ArticleCard article={mockArticle} setArticles={setArticles} />
            </MemoryRouter>)
        // userEvent.click(screen.getByTestId('article-card-author-link'))
        // screen.debug()
        expect(screen.getByTestId('article-card-author-link')).toHaveProperty('href', 'http://localhost/profile/authorUser')
        // expect(mockHistoryPush).toHaveBeenCalledWith('/profile/authorUser');
    })

})
