import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#1a202c',
        height: '92vh',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    signup: {
        color: 'white',
        textTransform: 'none',
        borderWidth: '2px',
        borderColor: '#a0aec0',
    },
    seeFreeDocsButton: {
        marginLeft: '10px',
        color: 'white',
        textTransform: 'none',
        backgroundColor: '#68d926',
        borderWidth: '2px',
        borderColor: '#68d926',
        '&:hover': {
            backgroundColor: '#68d926'
        }
    },
    h2: {
        padding: theme.spacing(1),
        color: 'white',
        [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '32px',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '48px',
        },
    },
    pseudo_a: {
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        }
    }
}));
const About = () => {
    const classes = useStyles();
    const history = useHistory();
    const onClickSignUp = () => {
        history.push('/signup')
    }
    return (
        <div className={classes.root} >
            <div style={{ textAlign: 'center' }}>
                <div className={classes.h2}>
                    Collect Free Documents For Development</div>
                <span style={{ color: 'white' }}>share your documentation or information for free!</span>
                <div style={{ marginTop: '20px' }}>
                    <Button
                        variant="outlined"
                        classes={{
                            root: classes.signup,
                        }}
                        onClick={() => { onClickSignUp() }}
                    >Sign Up</Button>
                    <Button
                        variant="outlined"
                        classes={{
                            root: classes.seeFreeDocsButton
                        }}>
                        <a
                            className={classes.pseudo_a}
                            href="#main" >
                            See Free Docs!
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default About