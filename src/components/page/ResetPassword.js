import React from 'react'
import { useParams } from 'react-router-dom'
import axiosbase from '../../utils/axiosbase'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useMessage } from '../../provider/messageProvider'
import { useError } from '../../provider/errorProvider'
import { useHistory } from 'react-router-dom'
const ResetPassword = () => {
    const params = useParams()
    const message = useMessage()
    const history = useHistory()
    const error = useError()
    const [password, setPassword] = React.useState('')
    const onClickSubmit = () => {
        axiosbase.post('/user/resetpassword', {
            token: params.token,
            password: password
        })
            .then((res) => {
                console.log(res)
                message.successMessage(res.data.message)
                history.push('/signin')
                // init()
                // setAuthenticated(true)
            })
            .catch(e => {
                error.setError(e)
            })
    }
    return (
        <Container maxWidth="sm">
            <Typography variant="h3">
                Reset password
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" >
                Enter new password
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={e => onClickSubmit(e)}
                >
                    Submit
                </Button>
            </div>
        </Container>
    )
}

export default ResetPassword