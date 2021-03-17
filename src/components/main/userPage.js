import React from 'react'
import Container from '@material-ui/core/Container';

import AppBar from './appBar'
import Footer from './footer'
import axios from 'axios'
import { useAuth } from '../../provider/authProvider'
import CreateArticle from '../article/createArticle'
import Articles from '../article/articles'
const UserPage = () => {
    const [articles, setArticles] = React.useState([]);
    const auth = useAuth();
    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/article')
            .then(res => {
                // console.log(res.data)
                setArticles(res.data)
            })
    }, [])

    return (
        <div>
            <AppBar />
            <Container maxWidth="sm">
                <Articles articles={articles} setArticles={setArticles} />
                <CreateArticle />
            </Container>
            <Footer />

        </div>
    )
}

export default UserPage