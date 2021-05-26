import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
// utils
import axiosbase from '../../utils/axiosbase'

const ArticleVote = ({ user, article_id }) => {
    const history = useHistory();
    const [vote, setVote] = React.useState({
        upvoteUsers: [],
        downvoteUsers: [],
    })
    React.useEffect(() => {
        axiosbase.get(`/article/vote?article_id=${article_id}`)
            .then(res => {
                setVote({
                    upvoteUsers: res.data.upvoteUsers,
                    downvoteUsers: res.data.downvoteUsers,
                })
            })
    }, [])
    const getVoteCount = () => {
        return vote.upvoteUsers.length - vote.downvoteUsers.length
    }
    const onClickUpVote = (e) => {
        e.preventDefault()
        user ?
            axiosbase.post('/article/upvote', {
                _id: article_id,
            }).then(res => {
                setVote({
                    upvoteUsers: res.data.upvoteUsers,
                    downvoteUsers: res.data.downvoteUsers,
                })

            })
            :
            history.push('/signin')
    }

    const onClickDownVote = () => {
        user ?
            axiosbase.post('/article/downvote', {
                _id: article_id,
            }).then(res => {
                setVote({
                    upvoteUsers: res.data.upvoteUsers,
                    downvoteUsers: res.data.downvoteUsers,
                })
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
                    color={user && vote.upvoteUsers.includes(user._id) ? "secondary" : 'default'}
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
                    color={user && vote.downvoteUsers.includes(user._id) ? "secondary" : 'default'}
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
}
export default ArticleVote