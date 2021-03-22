import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// utils
import axios from 'axios'
import { useError } from '../../provider/errorProvider'
import { useMessage } from '../../provider/messageProvider'

//components
import EditArticle from './editArticle'
import TagChips from './tagChips'

const useStyles = makeStyles((theme) => ({
    tagPaper: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 'auto',
        minHeight: '50px',
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
const Article = ({ article, setArticles }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const error = useError();
    const message = useMessage();
    const [isEdit, setIsEdit] = React.useState(false)
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const onClickDelete = (e, id) => {
        e.preventDefault()
        axios.delete(process.env.REACT_APP_API + '/article', {
            data: {
                _id: id
            }
        }).then(() => {
            axios.get(process.env.REACT_APP_API + '/article')
                .then(res => {
                    setArticles(res.data)
                    message.successMessage('deleted')
                }).catch(error.setError)
        }
        ).catch(error.setError)
    }

    const onClickEdit = (e) => {
        e.preventDefault()
        setIsEdit(true)
    }
    return (
        <div style={{ width: '100%' }}>
            {isEdit ?
                <EditArticle
                    setIsEdit={setIsEdit}
                    article={article}
                    setArticles={setArticles}
                />
                :
                <Card style={{ marginBottom: '10px' }}>
                    <CardContent>
                        <Paper
                            elevation={0}
                            component="ul"
                            className={classes.tagPaper}>
                            <TagChips tags={article.tags} setTags={() => { }} deletable={false} />
                        </Paper>
                    </CardContent>
                    <CardContent>
                        <Link herf={article.url} target='_blank'>{article.url}</Link>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton
                            onClick={e => { onClickEdit(e, article._id) }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={e => { onClickDelete(e, article._id) }}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography
                                style={{ whiteSpace: "pre-line" }}
                                variant="body2"
                                color="textSecondary"
                                component="span"
                            >
                                {article.description}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
                // </Box>
            }
        </div >
    )
}

Article.propTypes = {
    article: PropTypes.object,
    setArticles: PropTypes.func,
}

export default Article