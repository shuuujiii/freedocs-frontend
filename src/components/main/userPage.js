import React from 'react'
import axios from 'axios'
// material-ui
import Grid from '@material-ui/core/Grid';
// components
import CreateArticle from '../article/createArticle'
import Articles from '../article/articles'
const UserPage = () => {
    const [articles, setArticles] = React.useState([]);
    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/article')
            .then(res => {
                setArticles(res.data)
            })
    }, [])

    return (
        <Grid container justify="center" spacing={2}>
            <Grid item xs={8}>
                <CreateArticle setArticles={setArticles} />
                <Articles articles={articles} setArticles={setArticles} />
            </Grid>
        </Grid>
    )
}

export default UserPage