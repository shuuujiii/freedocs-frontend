import React from 'react'
import AppBar from './appBar'
import Footer from './footer'
import axios from 'axios'
import { useAuth } from '../../provider/authProvider'
import CreateArticle from '../createArticle'
const UserPage = () => {
    const [articles, setArticles] = React.useState([]);
    const auth = useAuth();
    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/article')
            .then(res => {
                console.log(res.data)
            })
    })

    return (
        <div>
            <AppBar />
            userpage
            <CreateArticle />
            <Footer />
        </div>
    )
}

export default UserPage