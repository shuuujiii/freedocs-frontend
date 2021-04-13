import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

// utils
import axiosbase from '../../utils/axiosbase'
const AddComment = ({ article_id,
    parent_id = null,
    setComments }) => {
    const [inputComment, setInputComment] = React.useState('')
    const onClickComment = () => {
        axiosbase.post('/article/comment', {
            article_id: article_id,
            parent_id: parent_id,
            comment: inputComment,
        }).then(res => {
            setComments(res.data)
        }
        )
        setInputComment('')

    }
    return (
        <div>
            <TextField
                multiline={true}
                fullWidth
                label="comment"
                variant="outlined"
                value={inputComment}
                onChange={e => { setInputComment(e.target.value) }}
            />
            <Box
                m={1}
            >
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => { onClickComment(article_id) }}
                >comment</Button>
            </Box>
        </div>
    )
}

AddComment.propTypes = {
    article_id: PropTypes.string,
    parent_id: PropTypes.string,
    setComments: PropTypes.func,
}
export default AddComment