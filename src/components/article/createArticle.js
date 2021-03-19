import React from 'react';
import PropTypes from 'prop-types'

// material-ui
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

// utils
import axios from 'axios';
import { useError } from '../../provider/errorProvider';
import { useMessage } from '../../provider/messageProvider';

// components
import Tags from './tags';

export default function CreateArticle({ setArticles }) {
    const error = useError();
    const message = useMessage();
    const [url, setUrl] = React.useState('');
    const [description, setDescription] = React.useState('')
    const [tags, setTags] = React.useState([])
    const onClickSave = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API + '/article', {
            url: url,
            description: description,
            tags: tags.map(tag => tag._id),
        }).then(
            () => {
                axios.get(process.env.REACT_APP_API + '/article')
                    .then(res => {
                        error.init()
                        setArticles(res.data)
                        message.successMessage('created')
                        setUrl('')
                        setTags([])
                    })
                    .catch(error.setError)
            }
        ).catch(error.setError);
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
    setArticles: PropTypes.func
}
