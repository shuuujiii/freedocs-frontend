import { render, screen, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockAxios from 'axios'
// import { MemoryRouter } from 'react-router-dom';
import ArticleVote from './ArticleVote'
const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));
const mockSetArticles = jest.fn()
const user = { _id: 'testuser' }
const articleId = "testArticleId"
describe('ArticleVote', () => {
    afterEach(cleanup)
    test('should render with no votes', async () => {
        render(<ArticleVote
            user={user}
            article_id={articleId}
            upvoteUsers={[]}
            downvoteUsers={[]}
            setArticles={mockSetArticles}
        />)
        expect(await screen.findByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-vote-count')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-vote-count')).toHaveTextContent('0')
        expect(await screen.findByTestId('article-card-votes')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-votes')).toHaveTextContent('Votes')
        expect(await screen.findByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
    })
})

describe('guest user', () => {
    test('should render to guest user', async () => {
        render(<ArticleVote
            user={null}
            article_id={articleId}
            upvoteUsers={['user1']}
            downvoteUsers={[]}
            setArticles={mockSetArticles}
        />)
        expect(await screen.findByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-vote-count')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-vote-count')).toHaveTextContent('1')
        expect(await screen.findByTestId('article-card-votes')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-votes')).toHaveTextContent('Votes')
        expect(await screen.findByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
    })
    test('when guest user click upvote button then push signin', async () => {
        render(<ArticleVote
            user={null}
            article_id={articleId}
            upvoteUsers={[]}
            downvoteUsers={[]}
            setArticles={mockSetArticles}
        />)
        userEvent.click(screen.getByTestId('article-card-upvote-icon-button'))
        await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(1))
        expect(mockHistoryPush).toHaveBeenCalledTimes(1)
        expect(mockHistoryPush).toHaveBeenCalledWith('/signin')
    })
    test('when guest user click downvoteButton then push signin', async () => {
        render(<ArticleVote
            user={null}
            article_id={articleId}
            upvoteUsers={[]}
            downvoteUsers={[]}
            setArticles={mockSetArticles}
        />)
        userEvent.click(screen.getByTestId('article-card-downvote-icon-button'))
        await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(1))
        expect(mockHistoryPush).toHaveBeenCalledWith('/signin')
    })
})

describe('login user', () => {
    test('should render', async () => {
        render(<ArticleVote
            user={user}
            article_id={articleId}
            upvoteUsers={['user1', 'user2', 'user3']}
            downvoteUsers={['userA', 'userB']}
            setArticles={mockSetArticles}
        />)
        expect(await screen.findByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-vote-count')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-vote-count')).toHaveTextContent('1')
        expect(await screen.findByTestId('article-card-votes')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-votes')).toHaveTextContent('Votes')
        expect(await screen.findByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
    })
    test('if login user click upvoteButton then post to api', async () => {
        render(<ArticleVote
            user={user}
            article_id={articleId}
            upvoteUsers={['user1', 'user2', 'user3']}
            downvoteUsers={['userA', 'userB']}
            setArticles={mockSetArticles}
        />)
        mockAxios.post.mockImplementation(() => {
            return Promise.resolve()
        })
        userEvent.click(screen.getByTestId('article-card-upvote-icon-button'))
        await waitFor(() => expect(mockAxios.post).toHaveBeenCalledTimes(1))
        expect(mockHistoryPush).toHaveBeenCalledTimes(0)
        expect(mockAxios.post).toHaveBeenCalledWith('/article/upvote', {
            _id: articleId
        })
        expect(await mockSetArticles).toHaveBeenCalledTimes(1)
    })
    test('login user click downvoteButton', async () => {
        render(<ArticleVote
            user={user}
            article_id={articleId}
            upvoteUsers={['user1', 'user2']}
            downvoteUsers={['userA', 'userB', 'userC']}
            setArticles={mockSetArticles}
        />)
        mockAxios.post.mockImplementation(() => {
            return Promise.resolve()
        })
        userEvent.click(screen.getByTestId('article-card-downvote-icon-button'))
        await waitFor(() => expect(mockAxios.post).toHaveBeenCalledTimes(1))
        expect(mockAxios.post).toHaveBeenCalledWith('/article/downvote', {
            _id: articleId
        })
        expect(mockHistoryPush).toHaveBeenCalledTimes(0)

        expect(await mockSetArticles).toHaveBeenCalledTimes(1)
    })
})

test('if user already upvote then upvote button style has changed', async () => {
    render(<ArticleVote
        user={user}
        article_id={articleId}
        upvoteUsers={['user1', 'user2', 'user3', user._id]}
        downvoteUsers={['userA', 'userB']}
        setArticles={mockSetArticles}
    />)
    expect(screen.getByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
    expect(screen.getByTestId('article-card-upvote-icon-button')).toHaveClass('MuiIconButton-colorSecondary')
    expect(screen.getByTestId('article-card-vote-count')).toBeInTheDocument()
    expect(screen.getByTestId('article-card-vote-count')).toHaveTextContent('2')
    expect(screen.getByTestId('article-card-votes')).toBeInTheDocument()
    expect(screen.getByTestId('article-card-votes')).toHaveTextContent('Votes')
    expect(screen.getByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
})



test('if user already downvoted then upvote button style has changed', async () => {
    render(<ArticleVote
        user={user}
        article_id={articleId}
        upvoteUsers={['user1', 'user2']}
        downvoteUsers={['userA', 'userB', 'userC', user._id]}
        setArticles={mockSetArticles}
    />)
    expect(screen.getByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
    expect(screen.getByTestId('article-card-vote-count')).toBeInTheDocument()
    expect(screen.getByTestId('article-card-vote-count')).toHaveTextContent('-2')
    expect(screen.getByTestId('article-card-votes')).toBeInTheDocument()
    expect(screen.getByTestId('article-card-votes')).toHaveTextContent('Votes')
    expect(screen.getByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
    expect(screen.getByTestId('article-card-downvote-icon-button')).toHaveClass('MuiIconButton-colorSecondary')
})