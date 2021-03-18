import React from 'react'
import axios from 'axios'
const Profile = () => {
    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/users')
            .then(res => {
                console.log(res.data)
            })
    }, [])
    return (
        <div>
            Profile Page
        </div>
    )
}

export default Profile