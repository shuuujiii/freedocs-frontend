import React from 'react'
import axiosbase from '../../utils/axiosbase'
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
import { useParams, Link } from 'react-router-dom'
// utils
// import { useAuth } from '../../provider/authProvider'
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
    const params = useParams()
    // const username = params.username
    const [profile, setProfile] = React.useState({})

    React.useEffect(() => {
        axiosbase.get(`/user/profile?username=${params.username}`)
            .then(res => {
                setProfile(res.data)
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
            />
            <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {profile.username ? profile.username[0].toUpperCase() : ''}
                </Avatar>
            </Box>
            <CardContent>
                <Box display="flex" justifyContent="center">
                    username:{profile.username}
                </Box>
                <Box display="flex" justifyContent="center">
                    posts:<Link to={`/lists?author=${profile.username}`}>{profile.posts}</Link>
                </Box>
            </CardContent>

        </Card>
    );
}

export default Profile