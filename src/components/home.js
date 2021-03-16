import React from 'react'
import { useHistory } from 'react-router-dom'
import MenuAppBar from './main/appBar'
import stick from './main/footer'
const Home = () => {
    const history = useHistory()
    const test = (e) => {
        e.preventDefault();
        history.push('/signup')
    }
    return (
        <div>
            <MenuAppBar />
            home
            <button onClick={(e) => { test(e) }}></button>
        </div>
    )
}

export default Home;