import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
// utils
import axiosbase from '../../utils/axiosbase'
import { useMessage } from '../../provider/messageProvider';

// components
import { Tags } from './Tags'
// validation
import Joi from 'joi'

const validateUrl = (value) => {
    const result = Joi.string().uri().required().validate(value)
    return result.error ? result.error.details[0].message : null
}
export default function CreateDialog({ open, setOpen }) {
    const message = useMessage();
    const [error, setError] = React.useState('')
    const initialUrlState = { input: '', error: validateUrl(''), touched: false }
    const [url, setUrl] = React.useState(initialUrlState);
    const [description, setDescription] = useState('')
    const [tags, setTags] = React.useState([])

    const onClickSave = async (e) => {
        e.preventDefault();
        setError('')
        const tag_ids = tags.map(tag => tag._id)
        try {
            const res = await axiosbase.post('/article', {
                url: url.input,
                description: description,
                tags: tag_ids,
            })
            message.successMessage('created')
            setUrl(initialUrlState)
            setDescription('')
            setTags([])
            setOpen(false)
            window.location.reload()
        } catch (e) {
            setError(e.response?.data?.message || 'sorry something wrong...')
        }
    }

    const handleClose = () => {
        setError('')
        setUrl(initialUrlState)
        setDescription('')
        setTags([])
        setOpen(false);
    };

    function onChangeUri(e) {
        setUrl({
            input: e.target.value,
            error: validateUrl(e.target.value),
            touched: true
        })
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='sm'
            aria-labelledby="form-dialog-title">
            <DialogTitle
                data-testid='create-dialog-title'
                id="form-dialog-title">Add Post</DialogTitle>
            <DialogContent>
                <DialogContentText
                    data-testid='create-dialog-content-text'
                >
                    Please share your infomation about free documents for developers!
                </DialogContentText>
                {error &&
                    <Alert severity="error">{error}</Alert>
                }
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    p={1}
                    m={1}
                >
                    <Tags
                        data-testid='create-dialog-tags'
                        tags={tags} setTags={setTags} />
                    <Box
                        display="flex"
                        flexDirection="column"
                        m={1}
                    >
                        <TextField
                            data-testid='create-dialog-url-textfield'
                            id="outlined-url"
                            label="URL (required)"
                            placeholder="input url"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={url.input}
                            onChange={e => { onChangeUri(e) }}
                        />
                        <div data-testid='create-dialog-uri-error'><span style={{ color: 'red' }}>{url.touched && url.error ? url.error : null}</span></div>
                    </Box>
                    <Box m={1}>
                        <TextField
                            data-testid='create-dialog-description-textfield'
                            multiline={true}
                            fullWidth
                            rows={5}
                            label="description"
                            variant="outlined"
                            value={description}
                            onChange={e => { setDescription(e.target.value) }}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    data-testid='create-dialog-button'
                    onClick={onClickSave} color="primary"
                    disabled={url.error ? true : false}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

CreateDialog.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}