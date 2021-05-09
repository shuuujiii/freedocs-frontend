import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { useError } from '../../provider/errorProvider'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function SimpleAlerts() {
    const classes = useStyles();
    const error = useError();
    const closeErrorAlert = () => {
        error.init()
    }
    return (
        <div>
            { error.errorState.hasError &&
                <div className={classes.root}>
                    <Alert
                        onClose={closeErrorAlert}
                        severity="error"
                    >{error.errorState.message}</Alert>
                </div>
            }
        </div>

    );
}
