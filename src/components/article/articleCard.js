import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
// import Badge from '@material-ui/core/Badge';

// provider
import { useAuth } from '../../provider/authProvider';
// components
import { TagChips } from './Tags'
import Comments from '../article/comments'
import EditArticle from './editArticle'
import ArticleVote from './ArticleVote'
import ArticleCardFavoriteButton from './ArticleCardFavoriteButton'
import ArticleCardDeleteButton from './ArticleCardDeleteButton'
import ArticleCardReportButton from './ArticleCardReportButton'
import ArticleCardAuthor from './ArticleCardAuthor'
const useStyles = makeStyles((theme) => ({
    card_main: {
        display: 'flex',
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
    const auth = useAuth();
    const [expanded, setExpanded] = React.useState(false);
    const [edit, setEdit] = React.useState(false)
    const handleExpandComment = () => {
        setExpanded(!expanded);
    };
    const onClickEdit = () => {
        setEdit(true)
    }

    return (
        edit ?
            <EditArticle setIsEdit={setEdit} article={article} setArticles={setArticles} /> :
            <div
                data-testid='article-card'
            >
                <Card>
                    <div className={classes.card_main}>
                        <ArticleVote
                            user={auth.authState.user}
                            article_id={article._id}
                            upvoteUsers={article.upvoteUsers}
                            downvoteUsers={article.downvoteUsers}
                            setArticles={setArticles} />
                        <CardContent classes={{ root: classes.card_content }}>
                            <TagChips
                                data-testid='article-card-tagchips'
                                tags={article.tags} />
                            <div className={classes.card_link}>
                                <Link
                                    data-testid='article-card-url-link'
                                    to={{ pathname: article?.url || '#' }} target='_blank' >{article.url}</Link>
                                <ArticleCardAuthor
                                    author={article.author}
                                    createdAt={article.createdAt} />
                            </div>
                        </CardContent>
                    </div>
                    <CardActions disableSpacing>
                        <ArticleCardFavoriteButton user={auth.authState.user} article_id={article._id} favoriteUsers={article.favoriteUsers} setArticles={setArticles} />
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
                            <div style={{ marginLeft: 'auto' }}>
                                <IconButton
                                    data-testid='article-card-edit-icon-button'
                                    coler="default"
                                    onClick={onClickEdit}
                                    aria-label="edit"
                                >
                                    <EditIcon />
                                </IconButton>
                                <ArticleCardDeleteButton article_id={article._id} />
                            </div>
                            :
                            <ArticleCardReportButton user={auth.authState.user} article_id={article._id} />}
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
            </div >
    )
}

ArticleCard.propTypes = {
    article: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        tags: PropTypes.array,
        url: PropTypes.string,
        description: PropTypes.string,
        user: PropTypes.string,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        upvoteUsers: PropTypes.array,
        downvoteUsers: PropTypes.array,
        author: PropTypes.string,
        favoriteUsers: PropTypes.array,
    }),
    setArticles: PropTypes.func,
}

export default ArticleCard;