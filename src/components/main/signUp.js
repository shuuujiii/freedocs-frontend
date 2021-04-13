import React from 'react';
// material-ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// validation
import Joi from 'joi'
// utils
import axiosbase from '../../utils/axiosbase'
import { StatusCodes } from 'http-status-codes'
import { useHistory } from 'react-router-dom'

// context
import { useError } from '../../provider/errorProvider'
import { useAuth } from '../../provider/authProvider'
// component
import Copyright from '../common/copyright'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const UserValidator = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required().options({ messages: { 'any.only': 'confirm password does not match' } }),
    admin: Joi.boolean(),
}).with('username', 'password')

export default function SignUp() {
    const error = useError();
    const history = useHistory();
    const auth = useAuth();
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const classes = useStyles();
    const onSubmitSignUp = async (e) => {
        e.preventDefault()
        try {
            await UserValidator.validateAsync({ username: username, password: password, confirmPassword: confirmPassword })
        } catch (err) {
            error.setErrorMessage(err.message)
            return
        }

        axiosbase.post('/users', {
            username: username,
            password: password,
        }).then(
            res => {
                if (res.status === StatusCodes.CREATED) {
                    auth.authenticated();
                    history.push('/');
                }
            }
        ).catch(error.setError)
    }
    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                value={username}
                                onChange={e => { setUsername(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => { setPassword(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmpassword"
                                label="confirm password"
                                type="password"
                                id="confirmpassword"
                                autoComplete="current-password"
                                value={confirmPassword}
                                onChange={e => { setConfirmPassword(e.target.value) }}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => onSubmitSignUp(e)}>
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}