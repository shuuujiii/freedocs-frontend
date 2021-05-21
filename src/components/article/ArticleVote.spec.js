import { getByTestId, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react-hooks'
import mockAxios from 'axios'
import * as Auth from '../../provider/authProvider'
import ArticleCard from './articleCard'
import { MemoryRouter } from 'react-router-dom';
import ArticleVote from './ArticleVote'
const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));
const setArticles = jest.fn()
describe('ArticleVote', () => {
    test('should render', () => {
        render(<ArticleVote
            user={{ _id: 'testuserid' }}
            article_id={'testarticleid'}
            upvoteUsers={['user1', 'user2', 'user3']}
            downvoteUsers={['userA', 'userb']}
            setArticles={setArticles}
        />)
        expect(screen.getByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-vote-count')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-vote-count')).toHaveTextContent('1')
        expect(screen.getByTestId('article-card-votes')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-votes')).toHaveTextContent('Votes')
        expect(screen.getByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
    })
})

describe('not login user', () => {
    beforeEach(() => {
        render(<ArticleVote
            user={null}
            article_id={'testarticleid'}
            upvoteUsers={['user1', 'user2', 'user3']}
            downvoteUsers={['userA', 'userb']}
            setArticles={setArticles}
        />)
    })
    test('should render', () => {
        expect(screen.getByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-vote-count')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-vote-count')).toHaveTextContent('1')
        expect(screen.getByTestId('article-card-votes')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-votes')).toHaveTextContent('Votes')
        expect(screen.getByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
    })
    test('click upvoteButton', () => {
        userEvent.click(screen.getByTestId('article-card-upvote-icon-button'))
        expect(mockHistoryPush).toHaveBeenCalledTimes(1)
        expect(mockHistoryPush).toHaveBeenCalledWith('/signin')
    })
    test('click downvoteButton', () => {
        userEvent.click(screen.getByTestId('article-card-downvote-icon-button'))
        expect(mockHistoryPush).toHaveBeenCalledTimes(1)
        expect(mockHistoryPush).toHaveBeenCalledWith('/signin')
    })
})

describe('login user', () => {
    beforeEach(() => {
        render(<ArticleVote
            user={{ _id: 'loginuser' }}
            article_id={'testarticleid'}
            upvoteUsers={['user1', 'user2', 'user3']}
            downvoteUsers={['userA', 'userb']}
            setArticles={setArticles}
        />)
    })
    test('should render', () => {
        expect(screen.getByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-vote-count')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-vote-count')).toHaveTextContent('1')
        expect(screen.getByTestId('article-card-votes')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-votes')).toHaveTextContent('Votes')
        expect(screen.getByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
    })
    test('click upvoteButton', async () => {
        mockAxios.post.mockImplementation(() => {
            return Promise.resolve()
        })
        userEvent.click(screen.getByTestId('article-card-upvote-icon-button'))
        expect(mockHistoryPush).toHaveBeenCalledTimes(0)
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(mockAxios.post).toHaveBeenCalledWith('/article/upvote', {
            _id: 'testarticleid'
        })
        expect(await setArticles).toHaveBeenCalledTimes(1)
    })
    test('click downvoteButton', async () => {
        mockAxios.post.mockImplementation(() => {
            return Promise.resolve()
        })
        userEvent.click(screen.getByTestId('article-card-downvote-icon-button'))
        expect(mockHistoryPush).toHaveBeenCalledTimes(0)
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(mockAxios.post).toHaveBeenCalledWith('/article/downvote', {
            _id: 'testarticleid'
        })
        expect(await setArticles).toHaveBeenCalledTimes(1)
    })
})

describe('upvote user', () => {
    beforeEach(() => {
        render(<ArticleVote
            user={{ _id: 'loginuser' }}
            article_id={'testarticleid'}
            upvoteUsers={['user1', 'user2', 'user3', 'loginuser']}
            downvoteUsers={['userA', 'userb']}
            setArticles={setArticles}
        />)
    })
    test('should render', () => {
        expect(screen.getByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-upvote-icon-button')).toHaveClass('MuiIconButton-colorSecondary')

        expect(screen.getByTestId('article-card-vote-count')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-vote-count')).toHaveTextContent('2')
        expect(screen.getByTestId('article-card-votes')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-votes')).toHaveTextContent('Votes')
        expect(screen.getByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
    })

})


describe('downvote user', () => {
    beforeEach(() => {
        render(<ArticleVote
            user={{ _id: 'loginuser' }}
            article_id={'testarticleid'}
            upvoteUsers={['user1']}
            downvoteUsers={['userA', 'userb', 'loginuser']}
            setArticles={setArticles}
        />)
    })
    test('should render', () => {
        expect(screen.getByTestId('article-card-upvote-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-vote-count')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-vote-count')).toHaveTextContent('-2')
        expect(screen.getByTestId('article-card-votes')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-votes')).toHaveTextContent('Votes')
        expect(screen.getByTestId('article-card-downvote-icon-button')).toBeInTheDocument()
        expect(screen.getByTestId('article-card-downvote-icon-button')).toHaveClass('MuiIconButton-colorSecondary')
    })

})