import React from 'react'
import { useHistory } from 'react-router-dom'
const Home = () => {
    const history = useHistory()
    const test = (e) => {
        e.preventDefault();
        history.push('/signin')
    }
    return (
        <div>
            home
            <button onClick={(e) => { test(e) }}>button</button>
        </div>
    )
}

export default Home;