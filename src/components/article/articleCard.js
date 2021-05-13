import React from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
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
    card_main: {
        display: 'flex',
    },
    card_vote: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    card_content: {
        // override root
        padding: 8,
        '&:last-child': {
            paddingBottom: 8,
        },
        // end override root
        display: 'flex',
        flex: 'auto',
        flexDirection: 'column',
    },
    card_link: {
        marginTop: theme.spacing(2)
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
                    <div className={classes.card_main}>
                        <div className={classes.card_vote}>
                            <IconButton>
                                <KeyboardArrowUpIcon />
                            </IconButton>
                            <div style={{ textAlign: 'center' }}>Vote</div>
                            <IconButton>
                                <KeyboardArrowDownIcon />
                            </IconButton>

                        </div>
                        <CardContent classes={{ root: classes.card_content }}>
                            <TagChips tags={article.tags} />
                            <div className={classes.card_link}>
                                <Link to={{ pathname: article?.url || '#' }} target='_blank' >{article.url}</Link>
                                <Typography variant="subtitle2" align="right" color="textSecondary" component="p">
                                    <Link to={`/profile/${article.author}`} > @{article.author} </Link>
                                    added {moment(article.createdAt).fromNow()}
                                </Typography>
                            </div>
                        </CardContent>
                        {/* </div> */}
                    </div>
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