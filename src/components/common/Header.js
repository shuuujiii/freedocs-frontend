import React from 'react';
import PropTypes from 'prop-types'
import { fade, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu'
// util
import axiosbase from '../../utils/axiosbase'
import { useHistory } from 'react-router-dom'
import { StatusCodes } from 'http-status-codes'

// context
import { useAuth } from '../../provider/authProvider'
import { useError } from '../../provider/errorProvider'
import SideBar from './SideBar'
const useStyles = makeStyles((theme) => ({
    title: {
        color: 'white',
        '&:hover': {
            cursor: 'pointer'
        },
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    signin: {
        color: 'white',
        textTransform: 'none',
    },
    signup: {
        color: 'white',
        textTransform: 'none',
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },

}));


export default function Header({ search, setSearch }) {
    const classes = useStyles();
    const history = useHistory();
    const error = useError();
    const auth = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openAccountMenu = Boolean(anchorEl);
    const [open, setOpen] = React.useState(false);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleProfile = () => {
        handleClose()
        history.push(`/profile/${auth.authState.user.username}`);
    };

    const handleSetting = () => {
        handleClose()
        history.push('/setting');
    };

    const handleLogout = () => {
        axiosbase.post('/users/logout')
            .then(res => {
                if (res.status === StatusCodes.OK) {
                    auth.logout();
                    history.push('/')
                    history.go(0)
                }
            }).catch(error.setError)
    }

    const onClickTitle = (e) => {
        e.preventDefault()
        history.push('/')
    }

    return (
        <div>
            <AppBar position="static" style={{}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: openAccountMenu,
                        })}
                    >
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
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            value={search}
                            onChange={e => { setSearch(e.target.value) }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div style={{ flexGrow: 1 }} />
                    {auth.authState.isAuthenticated ? (
                        // login user
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
                                open={openAccountMenu}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                <MenuItem onClick={handleSetting}>Setting</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        // guest user
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
            <SideBar open={open} setOpen={setOpen} auth={auth} />
        </div>
    );
}

Header.propTypes = {
    search: PropTypes.string,
    setSearch: PropTypes.func,
}