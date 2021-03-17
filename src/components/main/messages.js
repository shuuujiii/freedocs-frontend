import React from 'react';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useMessage } from '../../provider/messageProvider'
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Messages() {
    const classes = useStyles();
    const message = useMessage();
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        message.close();
    };

    return (
        <div className={classes.root}>
            <Snackbar open={message.state.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={message.state.severity}>
                    {message.state.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
