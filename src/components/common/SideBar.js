import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import { useHistory } from 'react-router-dom'
const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function SideBar({ open, setOpen, auth }) {
    const classes = useStyles();
    const history = useHistory();
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const onClickRanking = () => {
        history.push('/')
    }

    const onClickDiscover = () => {
        history.push('/lists')
    }

    const onClickFavorite = (e) => {
        e.preventDefault()
        let p = new URLSearchParams();
        if (auth.authState.user.username) {
            p.append('user', auth.authState.user.username)
            p.append('favorite', true)
        }
        history.push(`/lists?${p}`)
    }

    const onClickMyPosts = (e) => {
        e.preventDefault()
        let p = new URLSearchParams();
        if (auth.authState.user.username) {
            p.append('user', auth.authState.user.username)
        }
        history.push(`/lists?${p}`)
        // history.push(`/lists/user/${auth.authState.user.username}`)
    }

    return (
        <SwipeableDrawer
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                {auth.authState.user ?
                    <React.Fragment>
                        <List>
                            <ListItem button key={'Ranking'} onClick={onClickRanking}>
                                <ListItemText primary={'Ranking'} />
                            </ListItem>
                            <ListItem button key={'Discover'} onClick={onClickDiscover}>
                                <ListItemText primary={'Discover'} />
                            </ListItem>
                        </List>
                        <Divider />
                        <div>Filter</div>
                        <List>
                            <ListItem button key={'Favorite'} onClick={onClickFavorite}>
                                <ListItemIcon><FavoriteIcon /></ListItemIcon>
                                <ListItemText primary={'Favorite'} />
                            </ListItem>
                            <ListItem button key={'MyPosts'} onClick={onClickMyPosts}>
                                <ListItemIcon><InboxIcon /></ListItemIcon>
                                <ListItemText primary={'MyPosts'} />
                            </ListItem>
                        </List>
                    </React.Fragment> :
                    <React.Fragment>
                        <List>
                            <ListItem button key={'Ranking'} onClick={onClickRanking}>
                                <ListItemText primary={'Ranking'} />
                            </ListItem>
                            <ListItem button key={'Discover'} onClick={onClickDiscover}>
                                <ListItemText primary={'Discover'} />
                            </ListItem>
                        </List>
                    </React.Fragment>
                }
            </div>
        </SwipeableDrawer>
    );
}

SideBar.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    auth: PropTypes.object,
}