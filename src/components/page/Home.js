import React from 'react'
// import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
// utils
import axiosbase from '../../utils/axiosbase'

// provider
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
import Loading from '../common/Loading'
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
    const history = useHistory()
    const auth = useAuth();
    const [likesArticles, setLikesArticles] = React.useState([])
    const [voteArticles, setVoteArticles] = React.useState([])
    const [recentlyPosted, setRecentlyPosted] = React.useState([])
    React.useEffect(() => {
        axiosbase.get('/article/ranking').then(
            res => {
                setRecentlyPosted(res.data.recentlyPosted)
                setLikesArticles(res.data.likesRanking)
                setVoteArticles(res.data.voteRanking)
            }
        )
    }, [])
    if (auth.authState.isLoading) {
        return <Loading />
    }
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
                                        <Button
                                            onClick={() => { history.push('/signup') }}
                                            variant="contained" color="primary">
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
                        <Typography variant="h4" color="textSecondary">Recently Posted</Typography>
                    </div>
                    <Grid container spacing={4}>
                        {recentlyPosted.map((article) => (
                            <Grid item key={article._id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography>
                                            <Link to={{ pathname: article.url || '#' }} target='_blank' >{article.url}</Link>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Link to='/lists?page=1&sortKey=createdAt&order=desc'>see more</Link>
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
                                            <FavoriteIcon />??{article.count}
                                        </IconButton>
                                        <Typography>
                                            <Link to={{ pathname: article.url || '#' }} target='_blank' >{article.url}</Link>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Link to='/lists?page=1&sortKey=favorite&order=desc'>see more</Link>

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
                                            <ThumbUpIcon />??{article.count}
                                        </IconButton>
                                        <Typography>
                                            <Link to={{ pathname: article.url || '#' }} target='_blank' >{article.url}</Link>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Link to='/lists?page=1&sortKey=vote&order=desc'>see more</Link>
                </Container>
            </main>
        </React.Fragment>
    );
}
