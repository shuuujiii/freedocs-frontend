import React from 'react'

import axios from 'axios'
// import { useAuth } from '../../provider/authProvider'
import CreateArticle from '../article/createArticle'
import Articles from '../article/articles'
const UserPage = () => {
    const [articles, setArticles] = React.useState([]);
    // const auth = useAuth();
    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/article')
            .then(res => {
                setArticles(res.data)
            })
    }, [])

    return (
        <div>
            <Articles articles={articles} setArticles={setArticles} />
            <CreateArticle setArticles={setArticles} />
        </div>
    )
}

export default UserPage