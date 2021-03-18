import React from 'react'
import axios from 'axios'
// import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Box } from '@material-ui/core';
import { CircularProgress, Button } from '@material-ui/core';

// utils
import { useHistory } from 'react-router-dom'
import { useMessage } from '../../provider/messageProvider'
import { useError } from '../../provider/errorProvider'
const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
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


function Profile() {
    const classes = useStyles();
    const history = useHistory();
    const message = useMessage();
    const error = useError();

    const [loading, setLoading] = React.useState(false)
    const [username, setUsername] = React.useState('')

    const onClickDeleteAccount = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.delete(process.env.REACT_APP_API + '/users').then(
            res => {
                setLoading(false)
                console.log('response', res)
                message.successMessage('delete user')
                history.push('/')
            }
        ).catch(err => {
            error.setErrorState({
                hasError: true,
                message: err.response?.data?.message || err.message
            })
            setLoading(false)
        })
    }
    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/users')
            .then(res => {
                setUsername(res.data.username)
            })
    }, [])

    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Profile"
            // subheader="September 14, 2016"
            />
            <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {username ? username[0].toUpperCase() : ''}
                </Avatar>
            </Box>
            <CardContent>
                <Box display="flex" justifyContent="center">
                    {username}
                </Box>
            </CardContent>
            <CardContent>
                <Box display="flex" justifyContent="center">
                    <Button
                        className={classes.button}
                        onClick={e => { onClickDeleteAccount(e) }}
                        disabled={loading}>
                        {loading && <CircularProgress size={14} />}
                        {!loading && 'Delete Account'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default Profile