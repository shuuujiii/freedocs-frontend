import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// utils
import axiosbase from '../../utils/axiosbase'

import { useMessage } from '../../provider/messageProvider'
import { useError } from '../../provider/errorProvider'
const ForgotPassword = () => {
    const message = useMessage()
    const error = useError()
    const [email, setEmail] = React.useState('')
    const onClickSubmit = () => {
        axiosbase.post('/user/forgotpassword', { email: email }).then(
            res => {
                message.successMessage(res.data.message)
            }
        ).catch(error.setError)
    }
    return (
        <Container maxWidth="sm">
            <Typography variant="h3">
                Forgot your password?
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" >
                Enter the email address associated with your account and we’ll send you a link to reset your password.
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    type="email"
                    size="small"
                    autoComplete="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value) }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={e => onClickSubmit(e)}
                >
                    Send
                </Button>
            </div>
        </Container>
    )
}

export default ForgotPassword