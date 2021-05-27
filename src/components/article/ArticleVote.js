import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
// utils
import axiosbase from '../../utils/axiosbase'

const ArticleVote = ({ user, article_id, upvoteUsers, downvoteUsers, setArticles }) => {
    const history = useHistory();
    const getVoteCount = () => {
        return upvoteUsers.length - downvoteUsers.length
    }
    const onClickUpVote = (e) => {
        e.preventDefault()
        user ?
            axiosbase.post('/article/upvote', {
                _id: article_id,
            }).then(res => {
                setArticles(prev => prev.map(article => article._id === res.data._id ? res.data : article))
            })
            :
            history.push('/signin')
    }

    const onClickDownVote = () => {
        user ?
            axiosbase.post('/article/downvote', {
                _id: article_id,
            }).then(res => {
                setArticles(prev => prev.map(article => article._id === res.data._id ? res.data : article))
            })
            :
            history.push('/signin')
    }
    return (
        <React.Fragment>
            <div
                data-testid='article-card-vote'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                <IconButton
                    data-testid='article-card-upvote-icon-button'
                    onClick={onClickUpVote}
                    color={user && upvoteUsers.includes(user._id) ? "secondary" : 'default'}
                >
                    <KeyboardArrowUpIcon />
                </IconButton>

                <div style={{ textAlign: 'center' }}>
                    <Typography
                        data-testid='article-card-vote-count'
                        variant="h6" align="center" color="textSecondary" component="p">
                        {getVoteCount()}
                    </Typography>
                    <Typography
                        data-testid='article-card-votes'
                        variant="subtitle2" align="center" color="textSecondary" component="p">
                        Votes
                    </Typography>
                </div>
                <IconButton
                    data-testid='article-card-downvote-icon-button'
                    onClick={onClickDownVote}
                    color={user && downvoteUsers.includes(user._id) ? "secondary" : 'default'}
                >
                    <KeyboardArrowDownIcon />
                </IconButton>

            </div>
        </React.Fragment>
    )
}

ArticleVote.propTypes = {
    user: PropTypes.object,
    article_id: PropTypes.string,
    upvoteUsers: PropTypes.array,
    downvoteUsers: PropTypes.array,
    setArticles: PropTypes.func,
}
export default ArticleVote