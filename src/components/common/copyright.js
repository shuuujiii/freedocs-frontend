import React from 'react';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" style={{ whiteSpace: 'nowrap' }}>
            {'Copyright © ' + new Date().getFullYear() + ' shuji watanabe.'}
        </Typography>
        //     <Typography variant="body2" color="textSecondary" align="center">
        //         {'Copyright © '}
        //         <Link color="inherit" href="">
        //             shuji watanabe
        //   </Link>{' '}
        //         {new Date().getFullYear()}
        //         {'.'}
        //     </Typography>
    );
}

export default Copyright;