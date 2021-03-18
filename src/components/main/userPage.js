import React from 'react'
import axios from 'axios'
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
        <div>
            <CreateArticle setArticles={setArticles} />
            <Articles articles={articles} setArticles={setArticles} />
        </div>
    )
}

export default UserPage