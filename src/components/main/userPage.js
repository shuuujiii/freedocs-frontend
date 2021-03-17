import React from 'react'
import AppBar from './appBar'
import Footer from './footer'
import axios from 'axios'
import { useAuth } from '../../provider/authProvider'
const UserPage = () => {
    const [articles, setArticles] = React.useState([]);
    const auth = useAuth();
    // React.useEffect(() => {
    //     axios.get(process.env.REACT_APP_API + '/article')
    //         .then(res => {
    //             console.log(res.data)
    //         })
    // })
    const handleAuthenticate = (e) => {
        e.preventDefault()
        axios.defaults.withCredentials = true;
        axios.post(process.env.REACT_APP_API + '/users/authenticate')
            .then((res) => {
                console.log('res is', res)
                auth.authenticated()
            }).catch(e => { console.log(e) })
    }
    return (
        <div>
            <AppBar />
            userpage
            <button onClick={e => { handleAuthenticate(e) }}>authenticate</button>
            <Footer />
        </div>
    )
}

export default UserPage