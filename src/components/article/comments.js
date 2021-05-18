import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ReplyIcon from '@material-ui/icons/Reply';

// utils
import axiosbase from '../../utils/axiosbase'

import { useAuth } from '../../provider/authProvider'

// components
import AddComment from './addComment'
const Comments = ({ article_id }) => {
    const [comments, setComments] = React.useState([])
    const auth = useAuth()
    React.useEffect(() => {
        let p = new URLSearchParams();
        p.append('article', article_id);
        axiosbase.get('/article/comment?' + p)
            .then(res => {
                setComments(res.data)
            })
    }, [])

    const CommentTree = ({ comments, setComments }) => {
        return (
            comments.map(comment => {
                return (
                    <div key={comment._id} >
                        <CommentNode comment={comment} setComments={setComments} />
                    </div>
                )
            })
        )
    }

    const CommentNode = ({ comment, setComments }) => {
        const [showReply, setShowReply] = React.useState(false)
        return (
            <div style={{ paddingLeft: `${comment.depth * 10}px` }}>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    {comment.comment}
                </div>
                <IconButton
                    aria-label="reply"
                    onClick={() => { setShowReply(!showReply) }}>
                    <ReplyIcon />
                </IconButton>
                <IconButton
                    aria-label="up"
                    onClick={() => { }}>
                    <ThumbUpIcon />
                </IconButton>
                <IconButton
                    aria-label="down"
                    onClick={() => { }}>
                    <ThumbDownIcon />
                </IconButton>

                {
                    auth.authState.user && showReply && <AddComment
                        article_id={article_id}
                        parent_id={comment._id}
                        setComments={setComments} />
                }
                {
                    comment.children.length !== 0 &&
                    <CommentTree
                        comments={comment.children}
                        setComments={setComments} />
                }
            </div >
        )
    }

    return (
        <div>
            {auth.authState.user &&
                <AddComment article_id={article_id}
                    parent_id={null}
                    setComments={setComments} />
            }
            <CommentTree comments={comments}
                setComments={setComments} />

        </div>
    )
}

Comments.propTypes = {
    article_id: PropTypes.string,
    comment: PropTypes.object,
    depth: PropTypes.number,
    setComments: PropTypes.func,
}
export default Comments