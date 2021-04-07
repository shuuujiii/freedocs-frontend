import React from 'react'
import PropTypes from 'prop-types'
import axiosbase from '../../utils/axiosbase'
// material-ui
// import Grid from '@material-ui/core/Grid';
// components
import CreateArticle from '../article/createArticle'
import Articles from '../article/articles'
const UserPage = ({ search }) => {
    const [articles, setArticles] = React.useState([]);

    React.useEffect(() => {
        let p = new URLSearchParams();
        p.append('search', search);
        axiosbase.get('/article?' + p)
            .then(res => {
                setArticles(res.data)
            })
    }, [search])

    return (
        // <Grid container justify="center" spacing={2}>
        //     <Grid item xs={8}>
        <div>
            <CreateArticle setArticles={setArticles} />
            <Articles articles={articles} setArticles={setArticles} />
        </div>
        //     </Grid>
        // </Grid>
    )
}
UserPage.propTypes = {
    search: PropTypes.string,
}
export default UserPage