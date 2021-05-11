import React from 'react';
// import PropTypes from 'prop-types'

// material-ui
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// utils
import axiosbase from '../../utils/axiosbase'
import { useError } from '../../provider/errorProvider';
import { useMessage } from '../../provider/messageProvider';

// components
import { Tags } from './Tags'
// validation
import Joi from 'joi'


const ArticleValidator = Joi.object({
    url: Joi.string().uri().required(),
    description: Joi.string().allow(null).allow(''),
    // user: Joi.string().required(),
    tags: Joi.array().items(Joi.allow(null)).required(),
    // likes: Joi.array().items(Joi.objectId().allow(null)).required(),
    // good: Joi.array().items(Joi.objectId().allow(null)).required(),
})

export default function CreateArticle() {
    const error = useError();
    const message = useMessage();
    const [url, setUrl] = React.useState('');
    const [description, setDescription] = React.useState('')
    const [tags, setTags] = React.useState([])

    const init = () => {
        error.init()
        setUrl('')
        setDescription('')
        setTags([])
    }
    const onClickSave = async (e) => {
        e.preventDefault();
        error.init()
        const tag_ids = tags.map(tag => tag._id)
        try {
            await ArticleValidator.validateAsync({
                url: url,
                description: description,
                tags: tag_ids,
            })
        } catch (err) {
            error.setErrorMessage(err.message)
            return
        }
        axiosbase.post('/article', {
            url: url,
            description: description,
            tags: tag_ids,
        }).then(() => {
            message.successMessage('created')
            init()
            window.location.reload()
        }).catch(e => {
            error.setError(e)
        }
        );
    }
    return (
        <Paper>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="left"
                p={1}
                m={1}
            >
                <Box>
                    <Tags tags={tags} setTags={setTags} />
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
                        rows={5}
                        label="description"
                        variant="outlined"
                        value={description}
                        onChange={e => { setDescription(e.target.value) }}
                    />
                </Box>
                <Box
                    m={1}
                >
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={e => { onClickSave(e) }}
                    >Save</Button>
                </Box>
            </Box>
        </Paper>
    );
}

CreateArticle.propTypes = {
    // setArticles: PropTypes.func
}
