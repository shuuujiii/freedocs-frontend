import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
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
export default function CreateDialog({ open, setOpen }) {
    // const [open, setOpen] = React.useState(false);
    const error = useError();
    const message = useMessage();
    const [url, setUrl] = React.useState('');
    const [description, setDescription] = React.useState('')
    const [tags, setTags] = React.useState([])

    const init = () => {
        // error.init()
        setUrl('')
        setDescription('')
        setTags([])
        setOpen(false)
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
            init()
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
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        init()
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='sm'
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Post</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                </DialogContentText>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    p={1}
                    m={1}
                >
                    {/* <Box> */}
                    <Tags tags={tags} setTags={setTags} />
                    {/* </Box> */}
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
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClickSave} color="primary">
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