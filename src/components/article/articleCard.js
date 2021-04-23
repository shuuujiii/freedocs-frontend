import React from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
// utils
import axiosbase from '../../utils/axiosbase'

// provider
import { useAuth } from '../../provider/authProvider';

// components
import TagChips from '../../components/article/tagChips'
import Comments from '../article/comments'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(1),
        margin: 'auto',
        alignItems: 'center',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

const ArticleCard = ({ article, setArticles }) => {
    const classes = useStyles();
    const history = useHistory();
    const auth = useAuth();
    const [expanded, setExpanded] = React.useState(false);
    const [likes, setLikes] = React.useState(false)
    const [good, setGood] = React.useState(false)
    const [bad, setBad] = React.useState(false)
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    React.useEffect(() => {
        if (auth.authState.user) {
            setLikes(article.likes.includes(auth.authState.user._id))
            setGood(article.good.includes(auth.authState.user._id))
            setBad(article.bad.includes(auth.authState.user._id))
        }
    }, [])

    const onClickLikes = () => {
        auth.authState.isAuthenticated ?
            axiosbase.post('/article/likes', {
                _id: article._id,
                likes: !likes,
            }).then(res => {
                setArticles(prev => {
                    return prev.map(article =>
                        article._id === res.data._id ? res.data : article
                    )
                })
                setLikes(res.data.likes.includes(auth.authState.user._id))

            })
            :
            history.push('/signin')
    }

    const onClickGood = () => {
        auth.authState.isAuthenticated ?
            axiosbase.post('/article/good', {
                _id: article._id,
                good: !good,
            }).then(res => {
                setArticles(prev => {
                    return prev.map(article =>
                        article._id === res.data._id ? res.data : article
                    )
                })
                setGood(res.data.good.includes(auth.authState.user._id))
                setBad(res.data.bad.includes(auth.authState.user._id))
            })
            :
            history.push('/signin')
    }

    const onClickBad = () => {
        auth.authState.isAuthenticated ?
            axiosbase.post('/article/bad', {
                _id: article._id,
                bad: !bad,
            }).then(res => {
                setArticles(prev => {
                    return prev.map(article =>
                        article._id === res.data._id ? res.data : article
                    )
                })
                setGood(res.data.good.includes(auth.authState.user._id))
                setBad(res.data.bad.includes(auth.authState.user._id))
            })
            :
            history.push('/signin')
    }

    return (
        <Card>
            <CardContent>
                <Paper
                    elevation={0}
                    component="ul"
                    className={classes.root}
                >
                    <TagChips
                        tags={article.tags}
                        setTags={() => { }}
                        deletable={false} />
                </Paper>
            </CardContent>
            <CardContent>
                <Link to={{ pathname: article?.url || '#' }} target='_blank' >{article.url}</Link>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    color={likes ? "secondary" : "default"}
                    aria-label="add to favorites"
                    onClick={() => { onClickLikes() }}>
                    <FavoriteIcon />
                </IconButton>
                <IconButton
                    color={good ? "primary" : "default"}
                    aria-label="good"
                    onClick={() => { onClickGood() }}>
                    <ThumbUpIcon />
                </IconButton>
                <IconButton
                    color={bad ? "primary" : "default"}
                    aria-label="bad"
                    onClick={() => { onClickBad() }}>
                    <ThumbDownIcon />
                </IconButton>
                <IconButton
                    coler="default"
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <CommentIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                        {article.description}
                    </div>
                </CardContent>
                <CardContent>
                    <Comments article_id={article._id} />
                </CardContent>
            </Collapse>
        </Card>
    )
}

ArticleCard.propTypes = {
    article: PropTypes.object,
    setArticles: PropTypes.func,
}

export default ArticleCard;