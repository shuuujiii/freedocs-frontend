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
// import { useError } from '../../provider/errorProvider'
// import { useMessage } from '../../provider/messageProvider'
// components
import { TagChips } from './Tags'
import Comments from '../article/comments'
import ReportDialog from './Report'
import DeleteDialog from './DeleteDialog'
import EditArticle from './editArticle'
import ArticleCardFavoriteButton from './ArticleCardFavoriteButton'
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
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        flex: 'auto',
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
    const [edit, setEdit] = React.useState(false)
    const [openReport, setOpenReport] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleExpandComment = () => {
        setExpanded(!expanded);
    };

    const handleCloseReport = () => {
        setOpenReport(false);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

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
        setOpenDelete(true)
    }

    const getVoteCount = () => {
        return article.votes.upvoteUsers.length - article.votes.downvoteUsers.length
    }
    const onClickUpVote = (e) => {
        e.preventDefault()
        auth.authState.user ?
            axiosbase.post('/article/upvote', {
                _id: article._id,
                // vote: !upvote
            }).then(res => {
                setArticles(prev => {
                    return prev.map(article =>
                        article._id === res.data._id ? res.data : article
                    )
                })
                // setUpvote(res.data.votes.upvoteUsers.includes(auth.authState.user._id))
                // setDownvote(res.data.votes.downvoteUsers.includes(auth.authState.user._id))
            })
            :
            history.push('/signin')
    }

    const onClickDownVote = () => {
        auth.authState.user ?
            axiosbase.post('/article/downvote', {
                _id: article._id,
                // vote: !downvote
            }).then(res => {
                setArticles(prev => {
                    return prev.map(article =>
                        article._id === res.data._id ? res.data : article
                    )
                })
                // setUpvote(res.data.votes.upvoteUsers.includes(auth.authState.user._id))
                // setDownvote(res.data.votes.downvoteUsers.includes(auth.authState.user._id))
            })
            :
            history.push('/signin')
    }

    return (
        edit ?
            <EditArticle setIsEdit={setEdit} article={article} setArticles={setArticles} /> :
            <div
                data-testid='article-card'
            >
                <Card>
                    <div className={classes.card_main}>
                        <div className={classes.card_vote}>
                            <IconButton
                                data-testid='article-card-upvote-icon-button'
                                onClick={onClickUpVote}
                                color={auth.authState.user && article.votes.upvoteUsers.includes(auth.authState.user._id) ? "secondary" : 'default'}
                            >
                                <KeyboardArrowUpIcon />
                            </IconButton>

                            <div style={{ textAlign: 'center' }}>
                                <Typography
                                    data-testid='article-card-vote-count'
                                    variant="h6" align="center" color="textSecondary" component="p">
                                    {getVoteCount()}
                                </Typography>
                                <Typography
                                    data-testid='article-card-votes'
                                    variant="subtitle2" align="center" color="textSecondary" component="p">
                                    Votes
                                </Typography>
                            </div>
                            <IconButton
                                data-testid='article-card-downvote-icon-button'
                                onClick={onClickDownVote}
                                color={auth.authState.user && article.votes.downvoteUsers.includes(auth.authState.user._id) ? "secondary" : 'default'}
                            >
                                <KeyboardArrowDownIcon />
                            </IconButton>

                        </div>
                        <CardContent classes={{ root: classes.card_content }}>
                            <TagChips
                                data-testid='article-card-tagchips'
                                tags={article.tags} />
                            <div className={classes.card_link}>
                                <Link
                                    data-testid='article-card-url-link'
                                    to={{ pathname: article?.url || '#' }} target='_blank' >{article.url}</Link>
                                <Typography style={{ marginTop: 'auto' }} variant="subtitle2" align="right" color="textSecondary">
                                    <Link
                                        data-testid="article-card-author-link"
                                        to={`/profile/${article.author}`} > @{article.author} </Link>
                                    <div
                                        data-testid='article-card-added-moment'
                                        style={{ display: 'inline-block' }}>added {moment(article.createdAt).fromNow()}</div>
                                </Typography>
                            </div>
                        </CardContent>
                        {/* </div> */}
                    </div>
                    <CardActions disableSpacing>
                        <ArticleCardFavoriteButton user={auth.authState.user} article_id={article._id} likes={article.likes} setArticles={setArticles} />
                        {/* <IconButton
                            color={good ? "primary" : "default"}
                            aria-label="good"
                            onClick={() => { onClickGood() }}>
                            <Badge badgeContent={article.good.length} color="primary">
                                <ThumbUpIcon />
                            </Badge>
                        </IconButton> */}
                        <IconButton
                            data-testid='article-card-comment-icon-button'
                            coler="default"
                            onClick={handleExpandComment}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <CommentIcon />
                        </IconButton>
                        {auth.authState.user?._id === article.user ?
                            <div style={{ marginLeft: 'auto' }}
                            ><IconButton
                                data-testid='article-card-edit-icon-button'
                                coler="default"
                                onClick={onClickEdit}
                                aria-label="edit"
                            >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    data-testid="article-card-delete-icon-button"
                                    style={{ marginLeft: 'auto' }}
                                    coler="default"
                                    onClick={handleClickDelete}
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <DeleteDialog open={openDelete} handleClose={handleCloseDelete} _id={article._id} />
                            </div>

                            : <IconButton
                                data-testid='article-card-report-icon-button'
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
                            <div
                                data-testid='article-card-description'
                                style={{ whiteSpace: 'pre-wrap' }}>
                                {article.description}
                            </div>
                        </CardContent>
                        <CardContent data-testid='article-card-comments'>
                            <Comments article_id={article._id} />
                        </CardContent>
                    </Collapse>
                </Card>
                <ReportDialog open={openReport} handleClose={handleCloseReport} article_id={article._id} />
            </div >
    )
}

ArticleCard.propTypes = {
    article: PropTypes.object,
    setArticles: PropTypes.func,
}

export default ArticleCard;