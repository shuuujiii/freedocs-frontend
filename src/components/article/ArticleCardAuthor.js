import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
const ArticleCardAuthor = ({ author, createdAt }) => {
    return (
        <React.Fragment>
            <Typography
                data-testid='article-card-author'
                style={{ marginTop: 'auto' }} variant="subtitle2" align="right" color="textSecondary">
                <Link
                    data-testid="article-card-author-link"
                    to={`/profile/${author}`} > @{author} </Link>
                <div
                    data-testid='article-card-added-moment'
                    style={{ display: 'inline-block' }}>added {moment(createdAt).fromNow()}</div>
            </Typography>
        </React.Fragment>
    )
}

ArticleCardAuthor.propTypes = {
    author: PropTypes.string,
    createdAt: PropTypes.string,
}

export default ArticleCardAuthor