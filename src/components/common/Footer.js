import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Copyright from './copyright'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));
export default function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                <Link style={{ marginLeft: '1rem', marginRight: '1rem', whiteSpace: 'nowrap' }} color="inherit" href="/terms">
                    利用規約
                </Link>{'/'}
                <Link style={{ marginLeft: '1rem', marginRight: '1rem', whiteSpace: 'nowrap' }} color="inherit" href="/privacypolicy">
                    プライバシーポリシー
                </Link>{'/'}
                <Link style={{ marginLeft: '1rem', marginRight: '1rem', whiteSpace: 'nowrap' }} color="inherit" href="https://docs.google.com/forms/d/e/1FAIpQLScuB1logXHSZVD6zYBnYlzF7IuG3vfROuhvQiZaJYZBU7hzlw/viewform">
                    お問い合わせ
                </Link>
            </Typography>
            <Copyright />
        </footer>

    );
}