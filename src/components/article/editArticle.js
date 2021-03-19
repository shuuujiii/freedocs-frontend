import React from 'react'
import PropTypes from 'prop-types'
// material-ui
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

// utils
import axios from 'axios'
import { useError } from '../../provider/errorProvider'
import { useMessage } from '../../provider/messageProvider'

// components
import Tags from './tags'

const EditArticle = ({ setIsEdit, article, setArticles }) => {
    const error = useError();
    const message = useMessage();
    const [url, setUrl] = React.useState(article.url)
    const [description, setDescription] = React.useState(article.description)
    const [tags, setTags] = React.useState(article.tags)
    const onClickSave = (e) => {
        e.preventDefault()
        axios.put(process.env.REACT_APP_API + '/article', {
            _id: article._id,
            url: url,
            description: description,
            tags: tags.map(tag => tag._id)
        }).then(
            () => {
                message.successMessage('edited')
                axios.get(process.env.REACT_APP_API + '/article')
                    .then(res => {
                        error.init()
                        setArticles(res.data)
                        setIsEdit(false)
                    })
            }
        ).catch(error.setError)
    }
    const onClickCancel = (e) => {
        // e.preventDefault()
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
                <Box>
                    <Tags tags={tags} setTags={setTags} deletable={true} />
                </Box>
                <Box
                    display="flex"
                    flexDirection="row"
                    m={1}
                >
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
                <Box m={1}>
                    <TextField
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
                        variant="contained"
                        fullWidth
                        onClick={e => { onClickSave(e) }}
                    >Save</Button>
                </Box>
                <Box m={1}>
                    <Button
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