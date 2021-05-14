import React from 'react'
// import PropTypes from 'prop-types'
// utils
import axiosbase from '../../utils/axiosbase'

// provider
import { Link } from 'react-router-dom'
import { useAuth } from '../../provider/authProvider';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    rankTitle: {
        width: '100%',
        borderBottom: 'solid 1px',
        textAlign: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function Home() {
    const classes = useStyles();
    const auth = useAuth();
    const [likesArticles, setLikesArticles] = React.useState([])
    const [voteArticles, setVoteArticles] = React.useState([])
    React.useEffect(() => {
        let mounted = true
        const getRankingData = async () => {
            const res = await axiosbase.get('/article/ranking')
            if (mounted) {
                console.log('ranking data', res.data)
                setLikesArticles(res.data.likesRanking)
                setVoteArticles(res.data.voteRanking)
            }
        }
        getRankingData()
        return () => mounted = false
    }, [])
    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {auth.authState.user ? null :
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
                                Collect Free Documents For Development
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                share your documentation or information for free!
                            </Typography>
                            <div className={classes.heroButtons}>
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <Button variant="contained" color="primary">
                                            SignUp
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                }
                <Container className={classes.cardGrid} maxWidth="md">
                    <div className={classes.rankTitle}>
                        <Typography variant="h4" color="textSecondary">LikesRanking</Typography>
                    </div>
                    <Grid container spacing={4}>
                        {likesArticles.map((article) => (
                            <Grid item key={article._id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <IconButton
                                            color="secondary">
                                            <FavoriteIcon />×{article.count}
                                        </IconButton>
                                        <Typography>
                                            <Link to={{ pathname: article.url || '#' }} target='_blank' >{article.url}</Link>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                    <div className={classes.rankTitle}>
                        <Typography variant="h4" color="textSecondary">VoteRanking</Typography>
                    </div>
                    <Grid container spacing={4}>
                        {voteArticles.map((article) => (
                            <Grid item key={article._id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <IconButton
                                            color="primary">
                                            <ThumbUpIcon />×{article.count}
                                        </IconButton>
                                        <Typography>
                                            <Link to={{ pathname: article.url || '#' }} target='_blank' >{article.url}</Link>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}
