import React from 'react';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
// utils
import axios from 'axios'
import { useError } from '../provider/errorProvider'
import { useMessage } from '../provider/messageProvider'
// conponent
import Messages from './main/messages'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(3),
            // width: '25ch',
        },
    },
}));

export default function CreateArticle() {
    const classes = useStyles();
    const error = useError();
    const message = useMessage();
    const [title, setTitle] = React.useState('');
    const [url, setUrl] = React.useState('');
    const onClickSave = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API + '/article', {
            title: title,
            url: url,
            tags: []
        }).then(
            () => {
                message.successMessage('created')
                setTitle('')
                setUrl('')
            }
        ).catch(err => {
            error.setErrorState({
                hasError: true,
                message: err.response?.data?.message || err.message
            })
        });
    }
    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                p={1}
                bgcolor="background.paper"
            >
                <Box p={1}>
                    <TextField
                        id="outlined-title"
                        label="Title"
                        placeholder="input title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={e => { setTitle(e.target.value) }}
                    />
                </Box>
                <Box p={1}>
                    <TextField
                        id="outlined-url"
                        label="URL"
                        placeholder="input url"
                        variant="outlined"
                        fullWidth
                        value={url}
                        onChange={e => { setUrl(e.target.value) }}
                    />
                </Box>
                <Box display="flex" flexDirection="row-reverse" p={1} m={1} bgcolor="background.paper">
                    <Button
                        variant="contained"
                        onClick={e => { onClickSave(e) }}
                    >Save</Button>
                </Box>
                <Messages />
            </Box>
        </Container>
    );
}
