import React from 'react'
import PropTypes from 'prop-types'
// material-ui
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// utils
import axios from 'axios'
import { useError } from '../../provider/errorProvider'
import { useMessage } from '../../provider/messageProvider'
const EditArticle = ({ setIsEdit, article, setArticles }) => {
    const error = useError();
    const message = useMessage();
    const [url, setUrl] = React.useState(article.url)
    const onClickSave = (e) => {
        e.preventDefault()
        if (article.url === url) {
            setIsEdit(false)
            return;
        }
        axios.put(process.env.REACT_APP_API + '/article', {
            _id: article._id,
            url: url,
            tags: []
        }).then(
            () => {
                message.successMessage('edited')
                axios.get(process.env.REACT_APP_API + '/article')
                    .then(res => {
                        setArticles(res.data)
                        setIsEdit(false)
                    })
            }
        ).catch(err => {
            error.setError({
                hasError: true,
                message: err?.response?.data?.message || err.message
            })
        })
    }
    const onClickCancel = (e) => {
        e.preventDefault()
        setIsEdit(false)
    }
    return (
        <Box
            display="flex"
            p={1}
            bgcolor="background.paper"
            alignItems="center"
        >
            <Box flexGrow={1} >
                <TextField
                    id="outlined-url"
                    label="URL"
                    placeholder="input url"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={url}
                    onChange={e => { setUrl(e.target.value) }}
                />
            </Box>
            <Box bgcolor="background.paper">
                <Button
                    variant="contained"
                    onClick={e => { onClickSave(e) }}
                >Save</Button>
            </Box>
            <Box bgcolor="background.paper">
                <Button
                    variant="contained"
                    onClick={e => { onClickCancel(e) }}
                >Cancel</Button>
            </Box>
        </Box>
    )
}

EditArticle.propTypes = {
    setIsEdit: PropTypes.func,
    article: PropTypes.object,
    setArticles: PropTypes.func
}

export default EditArticle