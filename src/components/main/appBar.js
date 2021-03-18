import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button'
// util
import { useHistory } from 'react-router-dom'

// context 
import { useAuth } from '../../provider/authProvider'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: 'white',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    signin: {
        color: 'white',
        textTransform: 'none',
    },
    signup: {
        color: 'white',
        textTransform: 'none',
    }

}));

export default function MenuAppBar() {
    const classes = useStyles();
    const history = useHistory();
    const auth = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleProfile = () => {
        handleClose()
        history.push('/profile');
    };

    const handleLogout = () => {
        auth.logout();
        history.push('/')
    }

    const onClickTitle = (e) => {
        e.preventDefault()
        auth.authState.isAuthenticated ? history.push('/userpage') : history.push('/')
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <div
                        className={classes.title}
                        onClick={e => { onClickTitle(e) }}
                    >
                        <Typography
                            variant="h6"
                        >
                            FreeDocs
                        </Typography>
                    </div>

                    {auth.authState.isAuthenticated ? (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div>
                            <Button
                                className={classes.signin}
                                href="/signin"
                            >Sign in</Button>
                            <Button
                                className={classes.signup}
                                variant="outlined"
                                href="/signup"
                            >Sign up</Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
