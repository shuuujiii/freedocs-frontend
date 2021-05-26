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
const user = { _id: 'testuser' }
const articleId = "testArticleId"
const noUserVoteData = {
    data: {
        upvoteUsers: ['user1', 'user2', 'user3'],
        downvoteUsers: ['userA', 'userB']
    }
}
const userUpvoteData = {
    data: {
        upvoteUsers: ['user1', 'user2', 'user3', user._id],
        downvoteUsers: ['userA', 'userB']
    }
}
const userDownvoteData = {
    data: {
        upvoteUsers: ['user1',],
        downvoteUsers: ['userA', 'userB', user._id]
    }
}
describe('ArticleVote', () => {
    afterEach(cleanup)
    test('should render', async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(noUserVoteData)
        })
        render(<ArticleVote
            user={user}
            article_id={articleId}
        />)
        expect(await screen.findByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-vote-count')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-vote-count')).toHaveTextContent('1')
        expect(await screen.findByTestId('article-card-votes')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-votes')).toHaveTextContent('Votes')
        expect(await screen.findByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
    })
})

describe('guest user', () => {
    test('should render', async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(noUserVoteData)
        })
        render(<ArticleVote
            user={null}
            article_id={articleId}
        />)
        expect(await screen.findByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-vote-count')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-vote-count')).toHaveTextContent('1')
        expect(await screen.findByTestId('article-card-votes')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-votes')).toHaveTextContent('Votes')
        expect(await screen.findByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
    })
    test('when guest user click upvote button then push signin', async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(noUserVoteData)
        })
        render(<ArticleVote
            user={null}
            article_id={articleId}
        />)
        userEvent.click(screen.getByTestId('article-card-upvote-icon-button'))
        await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(1))
        expect(mockHistoryPush).toHaveBeenCalledTimes(1)
        expect(mockHistoryPush).toHaveBeenCalledWith('/signin')
    })
    test('when guest user click downvoteButton then push signin', async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(noUserVoteData)
        })
        render(<ArticleVote
            user={null}
            article_id={articleId}
        />)
        userEvent.click(screen.getByTestId('article-card-downvote-icon-button'))
        await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledTimes(1))
        expect(mockHistoryPush).toHaveBeenCalledWith('/signin')
    })
})

describe('login user', () => {
    test('should render', async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(noUserVoteData)
        })
        render(<ArticleVote
            user={user}
            article_id={articleId}
        />)
        expect(await screen.findByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-vote-count')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-vote-count')).toHaveTextContent('1')
        expect(await screen.findByTestId('article-card-votes')).toBeInTheDocument()
        expect(await screen.findByTestId('article-card-votes')).toHaveTextContent('Votes')
        expect(await screen.findByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
    })
    test('login user click upvoteButton', async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(noUserVoteData)
        })
        render(<ArticleVote
            user={user}
            article_id={articleId}
        />)
        mockAxios.post.mockImplementation(() => {
            return Promise.resolve(userUpvoteData)
        })
        userEvent.click(screen.getByTestId('article-card-upvote-icon-button'))
        await waitFor(() => expect(mockAxios.post).toHaveBeenCalledTimes(1))
        expect(mockHistoryPush).toHaveBeenCalledTimes(0)
        // expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(mockAxios.post).toHaveBeenCalledWith('/article/upvote', {
            _id: articleId
        })
        // expect(await setArticles).toHaveBeenCalledTimes(1)
    })
    test('login user click downvoteButton', async () => {
        mockAxios.get.mockImplementation(() => {
            return Promise.resolve(noUserVoteData)
        })
        render(<ArticleVote
            user={user}
            article_id={articleId}
        />)
        mockAxios.post.mockImplementation(() => {
            return Promise.resolve(userDownvoteData)
        })
        userEvent.click(screen.getByTestId('article-card-downvote-icon-button'))
        await waitFor(() => expect(mockAxios.post).toHaveBeenCalledTimes(1))
        expect(mockAxios.post).toHaveBeenCalledWith('/article/downvote', {
            _id: articleId
        })
        expect(mockHistoryPush).toHaveBeenCalledTimes(0)

        // expect(await setArticles).toHaveBeenCalledTimes(1)
    })
})

test('if user already upvote then upvote button style has changed', async () => {
    mockAxios.get.mockImplementation(() => {
        return Promise.resolve(userUpvoteData)
    })
    render(<ArticleVote
        user={user}
        article_id={articleId}
    />)
    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1))
    expect(screen.getByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
    expect(screen.getByTestId('article-card-upvote-icon-button')).toHaveClass('MuiIconButton-colorSecondary')
    expect(screen.getByTestId('article-card-vote-count')).toBeInTheDocument()
    expect(screen.getByTestId('article-card-vote-count')).toHaveTextContent('2')
    expect(screen.getByTestId('article-card-votes')).toBeInTheDocument()
    expect(screen.getByTestId('article-card-votes')).toHaveTextContent('Votes')
    expect(screen.getByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
})



test('if user already upvote then upvote button style has changed', async () => {
    mockAxios.get.mockImplementation(() => {
        return Promise.resolve(userDownvoteData)
    })
    render(<ArticleVote
        user={user}
        article_id={articleId}
    />)
    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1))

    expect(screen.getByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
    expect(screen.getByTestId('article-card-vote-count')).toBeInTheDocument()
    expect(screen.getByTestId('article-card-vote-count')).toHaveTextContent('-2')
    expect(screen.getByTestId('article-card-votes')).toBeInTheDocument()
    expect(screen.getByTestId('article-card-votes')).toHaveTextContent('Votes')
    expect(screen.getByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
    expect(screen.getByTestId('article-card-downvote-icon-button')).toHaveClass('MuiIconButton-colorSecondary')
})