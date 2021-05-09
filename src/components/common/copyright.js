import React from 'react';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';


function Copyright() {
    return (
        <Typography variant="subtitle2" align="center" color="textSecondary" component="p">
            {'Copyright © ' + new Date().getFullYear() + ' shuji watanabe.'}
        </Typography>
    );
}

export default Copyright;