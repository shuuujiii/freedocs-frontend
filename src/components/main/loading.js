import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
    },
}));

export default function Loading() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress size={120} />
        </div>
    );
}