import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Copyright from '../common/copyright'

export default function Footer() {
    return (
        <Container style={{ display: 'flex', justifyContent: 'center' }} maxWidth="sm">
            <Copyright />
            <Typography variant="body2" color="textSecondary" style={{ whiteSpace: 'nowrap' }}>
                <Link style={{ marginLeft: '1rem', marginRight: '1rem', whiteSpace: 'nowrap' }} color="inherit" href="/terms">
                    利用規約
                </Link>{'/'}
                <Link style={{ marginLeft: '1rem', marginRight: '1rem', whiteSpace: 'nowrap' }} color="inherit" href="/privacypolicy">
                    プライバシーポリシー
                </Link>{'/'}
                <Link style={{ marginLeft: '1rem', marginRight: '1rem', whiteSpace: 'nowrap' }} color="inherit" href="/about">
                    about
                </Link>{'/'}
                <Link style={{ marginLeft: '1rem', marginRight: '1rem', whiteSpace: 'nowrap' }} color="inherit" href="/contact">
                    お問い合わせ
                </Link>
            </Typography>
        </Container >
    );
}