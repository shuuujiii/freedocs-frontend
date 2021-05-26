import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axiosbase from '../../utils/axiosbase'
import { useHistory } from 'react-router-dom'
const ArticleCardFavoriteButton = ({ user, article_id }) => {
    const history = useHistory()
    const [favUsers, setFavUsers] = React.useState([])
    React.useEffect(() => {
        let p = new URLSearchParams();
        p.append('article_id', article_id);
        axiosbase.get('/article/favorite?' + p)
            .then(res => {
                // console.log('responser fav', res.data)
                setFavUsers(res.data.users)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])
    const onClickLikes = (e) => {
        e.preventDefault()
        user ?
            axiosbase.post('/article/likes', {
                _id: article_id,
            }).then(res => {
                setFavUsers(res.data.users)
            })
            :
            history.push('/signin')
    }
    return (
        // <React.Fragment>
        <IconButton
            data-testid="article-card-favorite-icon-button"
            color={user && favUsers.includes(user._id) ? "secondary" : "default"}
            aria-label="add to favorites"
            onClick={onClickLikes}>
            <Badge
                data-testid='article-card-favorite-badge'
                badgeContent={favUsers.length} color="secondary">
                <FavoriteIcon />
            </Badge>
        </IconButton>
        // </React.Fragment>
    )
}
ArticleCardFavoriteButton.propTypes = {
    user: PropTypes.object,
    article_id: PropTypes.string,
    // likes: PropTypes.array,
    // setArticles: PropTypes.func
}

export default ArticleCardFavoriteButton