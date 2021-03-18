import React from 'react';
import PropTypes from 'prop-types'
// material-ui
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
    const [tags, setTags] = React.useState([])
    const onClickSave = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API + '/article', {
            url: url,
            tags: tags
        }).then(
            () => {
                axios.get(process.env.REACT_APP_API + '/article')
                    .then(res => {
                        setArticles(res.data)
                        message.successMessage('created')
                        setUrl('')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        ).catch(error.setError);
    }
    return (
        <div>
            <Tags tags={tags} setTags={setTags} />
            <Box
                display="flex"
                p={1}
                bgcolor="background.paper"
                alignItems="center"
                marginTop="10px"
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
            </Box>
        </div>
    );
}

CreateArticle.propTypes = {
    setArticles: PropTypes.func
}
