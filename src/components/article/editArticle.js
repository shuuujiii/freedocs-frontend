import React from 'react'
import PropTypes from 'prop-types'
// material-ui
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

// utils
import axiosbase from '../../utils/axiosbase'
import { useError } from '../../provider/errorProvider'
import { useMessage } from '../../provider/messageProvider'
// components
import { Tags } from './Tags'


const EditArticle = ({ setIsEdit, article, setArticles }) => {
    const error = useError();
    const message = useMessage();
    // const [url, setUrl] = React.useState(article.url)
    const [description, setDescription] = React.useState(article.description)
    const [tags, setTags] = React.useState(article.tags)
    const onClickSave = (e) => {
        e.preventDefault()
        error.init()
        const tag_ids = tags.map(tag => tag._id)
        axiosbase.put('/article', {
            _id: article._id,
            url: article.url,
            description: description,
            tags: tag_ids
        }).then(
            (res) => {
                message.successMessage('edited')
                setArticles(prev => {
                    return prev.map(article =>
                        article._id === res.data._id ? res.data : article
                    )
                })
                setIsEdit(false)
            }
        ).catch(error.setError)
    }
    const onClickCancel = () => {
        setIsEdit(false)
    }

    return (
        <Paper >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="left"
                p={1}
                m={1}
            >
                <Tags
                    data-testid='tags'
                    tags={tags} setTags={setTags} />
                <Box
                    display="flex"
                    flexDirection="row"
                    m={1}
                >
                    <TextField
                        data-testid='edit-article-url-textfield'
                        id="outlined-url"
                        label="URL"
                        placeholder="input url"
                        variant="outlined"
                        fullWidth
                        disabled
                        size="small"
                        value={article.url}
                    // onChange={e => { setUrl(e.target.value) }}
                    />
                </Box>
                <Box m={1}>
                    <TextField
                        data-testid='edit-article-description-textfield'
                        multiline={true}
                        fullWidth
                        label="description"
                        variant="outlined"
                        value={description}
                        onChange={e => { setDescription(e.target.value) }}
                    />
                </Box>
                <Box m={1}>
                    <Button
                        data-testid='edit-article-save-button'
                        variant="contained"
                        fullWidth
                        onClick={e => { onClickSave(e) }}
                    >Save</Button>
                </Box>
                <Box m={1}>
                    <Button
                        data-testid='edit-article-cancel-button'
                        variant="contained"
                        fullWidth
                        onClick={e => { onClickCancel(e) }}
                    >Cancel</Button>
                </Box>
            </Box>
        </Paper>
    )
}

EditArticle.propTypes = {
    setIsEdit: PropTypes.func,
    article: PropTypes.object,
    setArticles: PropTypes.func
}

export default EditArticle