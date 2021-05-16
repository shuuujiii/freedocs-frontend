import React from 'react'
import PropTypes from 'prop-types'
import axiosbase from '../../utils/axiosbase'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { CircularProgress, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
// utils
import { useHistory } from 'react-router-dom'
import { useMessage } from '../../provider/messageProvider'
import { useError } from '../../provider/errorProvider'
import { useAuth } from '../../provider/authProvider'
const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        backgroundColor: red[500],
    },
    button: {
        color: 'white',
        backgroundColor: '#f44336',
        '&:hover': {
            backgroundColor: '#d32f2f'
        }

    }
}));

function DeleteAccountDialog({ open, handleClose }) {
    const message = useMessage()
    const error = useError()
    const history = useHistory();
    const auth = useAuth()
    const [username, setUsername] = React.useState('')
    // const init = () => {
    //     setUsername('')
    // }
    const closeDialog = () => {
        handleClose()
        setUsername('')
    }

    const onClickDelete = () => {
        axiosbase.delete('/users').then(
            () => {
                message.successMessage('delete user')
                auth.logout()
                history.push('/')
            }
        ).catch(err => {
            error.setError(err)
        })
    }
    return (
        <div>
            <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Account"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete your account? This cannot be undone.<br />
                        {/* <div style={{ verticalAlign: 'center' }}><WarningIcon />To delete your account type your username.</div> */}
                    </DialogContentText>
                    <WarningIcon />
                    <DialogContentText id="alert-dialog-description">
                        To delete your account type your username.
                    </DialogContentText>
                    <TextField
                        id="outlined-url"
                        label="username"
                        placeholder="input username"
                        variant="outlined"
                        fullWidth
                        size="small"
                        autoFocus
                        value={username}
                        onChange={e => { setUsername(e.target.value) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button disabled={username !== auth.authState.user.username} onClick={onClickDelete} variant="outlined" color="secondary" >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

DeleteAccountDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    _id: PropTypes.string,
}

function Settings() {
    const classes = useStyles();
    // const history = useHistory();
    // const message = useMessage();
    // const error = useError();
    const auth = useAuth();
    const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = React.useState(false)

    // const [loading, setLoading] = React.useState(false)
    const username = auth.authState.user.username
    const handleClose = () => {
        setOpenDeleteAccountDialog(false);
    };
    const onClickDeleteAccount = (e) => {
        e.preventDefault()
        setOpenDeleteAccountDialog(true)
    }

    return (
        <div style={{
            flexGrow: '1',
            paddingLeft: '16px',
            paddingRight: '16px',
            maxWidth: 'xs',
        }}>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={6} lg={6} md={6}>
                    <h1 style={{ borderBottom: '1px solid #21262d' }}>Setting</h1>
                    <div style={{
                        display: "flex",
                        flexDirection: 'column',
                        justifyContent: "center",
                        alignItems: 'center',
                    }}>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {username ? username[0].toUpperCase() : ''}
                        </Avatar>
                        <div style={{ marginTop: '16px' }}>{username}</div>
                        <ChangePasswordButton />
                        <ChangeEmailButton mailAddress={auth.authState.user.email} />
                        <Button
                            className={classes.button}
                            fullWidth
                            style={{ marginTop: '16px' }}
                            onClick={e => { onClickDeleteAccount(e) }}
                        // disabled={loading}>
                        // {loading && <CircularProgress size={14} />}
                        // {!loading && 'Delete Account'}
                        >
                            Delete Account
                        </Button>
                        <DeleteAccountDialog open={openDeleteAccountDialog} handleClose={handleClose} />
                    </div>
                </Grid>
            </Grid>
        </div >
    );
}

const ChangePasswordButton = () => {
    const message = useMessage();
    const error = useError();
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const [oldPassword, setOldPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const init = () => {
        setLoading(false)
        setOldPassword('')
        setNewPassword('')
        setOpen(false)
    }


    const onClickChangePassword = async (e) => {
        e.preventDefault()
        try {
            message.init()
            error.init()
            setLoading(true)
            await axiosbase.post('/users/changepassword', {
                oldPassword: oldPassword,
                newPassword: newPassword,
            })
            message.successMessage('password changed!')
        } catch (e) {
            error.setError(e)
        } finally {
            init()
        }

    }
    return (
        open ?
            <div style={{ width: '100%' }}>
                <TextField
                    id="outlined-password"
                    label="Password"
                    placeholder="password"
                    variant="outlined"
                    type='password'
                    fullWidth
                    size="small"
                    value={oldPassword}
                    onChange={e => { setOldPassword(e.target.value) }}
                />
                <TextField
                    id="outlined-new-password"
                    label="New password"
                    placeholder="new password"
                    variant="outlined"
                    type='password'
                    fullWidth
                    size="small"
                    style={{ marginTop: '16px' }}
                    value={newPassword}
                    onChange={e => { setNewPassword(e.target.value) }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <Button
                        onClick={e => { onClickChangePassword(e) }}
                        color="primary"
                        variant="outlined"
                        disabled={loading}>
                        {loading && <CircularProgress size={14} />}
                        {!loading && 'change'}
                    </Button>
                    <Button
                        onClick={() => { init() }}
                        color="primary"
                        variant="outlined"
                        disabled={loading}>
                        {loading && <CircularProgress size={14} />}
                        {!loading && 'cancel'}
                    </Button>
                </div>
            </div> :
            <Button
                style={{ marginTop: '16px' }}
                onClick={() => { setOpen(true) }}
                disabled={loading}
                color="primary"
                variant="outlined"
                fullWidth
            >
                {loading ? <CircularProgress size={14} /> : 'change Password'}
            </Button>
    )
}


const ChangeEmailButton = () => {
    const message = useMessage();
    const error = useError();
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const auth = useAuth();
    const [email, setEmail] = React.useState(auth.authState.user.email)
    const init = () => {
        setLoading(false)
        setEmail(auth.authState.user.email)
        setOpen(false)
    }

    const onClickChangeEmail = async (e) => {
        e.preventDefault()
        try {
            message.init()
            error.init()
            setLoading(true)
            const res = await axiosbase.post('/users/changeemail', {
                email: email,
            })
            auth.authenticated(res.data.user)
            message.successMessage('email changed!')
        } catch (e) {
            error.setError(e)
        } finally {
            setLoading(false)
            setOpen(false)
        }

    }
    return (
        open ?
            <div style={{ width: '100%' }}>
                <TextField
                    id="outlined-email"
                    label="Email"
                    placeholder="new email address"
                    variant="outlined"
                    type='email'
                    fullWidth
                    size="small"
                    style={{ marginTop: '16px' }}
                    value={email}
                    onChange={e => { setEmail(e.target.value) }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <Button
                        onClick={e => { onClickChangeEmail(e) }}
                        color="primary"
                        variant="outlined"
                        disabled={loading}>
                        {loading && <CircularProgress size={14} />}
                        {!loading && 'change'}
                    </Button>
                    <Button
                        onClick={() => { init() }}
                        color="primary"
                        variant="outlined"
                        disabled={loading}>
                        {loading && <CircularProgress size={14} />}
                        {!loading && 'cancel'}
                    </Button>
                </div>
            </div> :
            <Button
                style={{ marginTop: '16px' }}
                onClick={() => { setOpen(true) }}
                disabled={loading}
                fullWidth
                color="primary"
                variant="outlined"
            >
                {loading && <CircularProgress size={14} />}
                {!loading && 'change Email'}
            </Button>

    )
}
export default Settings