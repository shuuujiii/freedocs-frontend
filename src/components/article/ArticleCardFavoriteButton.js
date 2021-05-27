import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axiosbase from '../../utils/axiosbase'
import { useHistory } from 'react-router-dom'
const ArticleCardFavoriteButton = ({ user, article_id, favoriteUsers, setArticles }) => {
    const history = useHistory()
    const onClickLikes = (e) => {
        e.preventDefault()
        user ?
            axiosbase.post('/article/likes', {
                _id: article_id,
            }).then(res => {
                console.log('clicked res.data', res.data)
                setArticles(prev =>
                    prev.map(article => article._id === res.data._id ? res.data : article)
                )
            })
            :
            history.push('/signin')
    }
    return (
        <React.Fragment>
            <IconButton
                data-testid="article-card-favorite-icon-button"
                color={user && favoriteUsers.includes(user._id) ? "secondary" : "default"}
                aria-label="add to favorites"
                onClick={onClickLikes}>
                <Badge
                    data-testid='article-card-favorite-badge'
                    badgeContent={favoriteUsers.length} color="secondary">
                    <FavoriteIcon />
                </Badge>
            </IconButton>
        </React.Fragment>
    )
}
ArticleCardFavoriteButton.propTypes = {
    user: PropTypes.object,
    article_id: PropTypes.string,
    favoriteUsers: PropTypes.array,
    setArticles: PropTypes.func
}

export default ArticleCardFavoriteButton