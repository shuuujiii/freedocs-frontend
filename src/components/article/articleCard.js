import React from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import ReportIcon from '@material-ui/icons/Report';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';

import moment from 'moment'
// utils
import axiosbase from '../../utils/axiosbase'

// provider
import { useAuth } from '../../provider/authProvider';
import { useError } from '../../provider/errorProvider'
import { useMessage } from '../../provider/messageProvider'
// components
import { TagChips } from './Tags'
import Comments from '../article/comments'
import ReportDialog from './Report'
import EditArticle from './editArticle'

const useStyles = makeStyles((theme) => ({
    aaa: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
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
    const error = useError()
    const message = useMessage()
    const [expanded, setExpanded] = React.useState(false);
    const [likes, setLikes] = React.useState(false)
    const [good, setGood] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [openReport, setOpenReport] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClose = () => {
        setOpenReport(false);
    };

    React.useEffect(() => {
        if (auth.authState.user) {
            setLikes(article.likes.includes(auth.authState.user._id))
            setGood(article.good.includes(auth.authState.user._id))
        }
    }, [auth.authState.user])

    const handleClickReport = () => {
        if (auth.authState.user) {
            setOpenReport(!openReport)
            return
        }
        history.push('/signin')
    }
    const onClickEdit = () => {
        setEdit(true)
    }

    const handleClickDelete = () => {
        axiosbase.delete('/article', { data: { _id: article._id } }).then(
            () => {
                message.successMessage('contents deleted')
                window.location.reload()
            }
        ).catch(err => {
            error.setError(err)
        })
    }

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
            })
            :
            history.push('/signin')
    }

    return (
        edit ?
            <EditArticle setIsEdit={setEdit} article={article} setArticles={setArticles} /> :
            <div>
                <Card>
                    <CardContent>
                        <Paper
                            elevation={0}
                            component="ul"
                            className={classes.root}
                        >
                            <TagChips
                                tags={article.tags} />
                        </Paper>
                    </CardContent>
                    <CardContent>
                        <Link to={{ pathname: article?.url || '#' }} target='_blank' >{article.url}</Link>
                        <Typography variant="subtitle2" align="right" color="textSecondary" component="p">
                            <Link to={`/profile/${article.author}`} > @{article.author} </Link>
                            added {moment(article.createdAt).fromNow()}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton
                            color={likes ? "secondary" : "default"}
                            aria-label="add to favorites"
                            onClick={() => { onClickLikes() }}>
                            <Badge badgeContent={article.likes.length} color="secondary">
                                <FavoriteIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            color={good ? "primary" : "default"}
                            aria-label="good"
                            onClick={() => { onClickGood() }}>
                            <Badge badgeContent={article.good.length} color="primary">
                                <ThumbUpIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            coler="default"
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <CommentIcon />
                        </IconButton>
                        {auth.authState.user?._id === article.user ?
                            <div style={{ marginLeft: 'auto' }}
                            ><IconButton
                                coler="default"
                                onClick={onClickEdit}
                                aria-label="edit"
                            >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    style={{ marginLeft: 'auto' }}
                                    coler="default"
                                    onClick={handleClickDelete}
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>

                            : <IconButton
                                style={{ marginLeft: 'auto' }}
                                coler="default"
                                onClick={handleClickReport}
                                aria-label="report"
                            >
                                <ReportIcon />
                            </IconButton>}

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
                <ReportDialog open={openReport} handleClose={handleClose} article_id={article._id} />
            </div >
    )
}

ArticleCard.propTypes = {
    article: PropTypes.object,
    setArticles: PropTypes.func,
}

export default ArticleCard;