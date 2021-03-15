import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { ErrorContext, ErrorStateInitial } from '../provider/totalProvider'

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
    const { errorState, setErrorState } = React.useContext(ErrorContext)
    const closeErrorAlert = () => {
        setErrorState(ErrorStateInitial)
    }
    return (
        <div>
            { errorState.hasError &&
                <div className={classes.root}>
                    <Alert
                        onClose={closeErrorAlert}
                        severity="error"
                    >{errorState.message}</Alert>
                </div>
            }
        </div>

    );
}
