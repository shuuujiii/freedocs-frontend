import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useError } from '../../provider/errorProvider'
// utils 
import axiosbase from '../../utils/axiosbase'
export default function EmailAuth(props) {
    const error = useError()
    const [authenticated, setAuthenticated] = React.useState(false)
    const token = props.match.params.token
    const init = () => {
        error.init()
    }
    React.useEffect(() => {
        console.log('useEffect')
        axiosbase.post('/users/auth/email', {
            token: token
        })
            .then(res => {
                init()
                setAuthenticated(true)
            })
            .catch(e => {
                error.setError(e)
            })
    }, [])
    return (
        authenticated ?
            <div>
                Email confirmed!
                <Link to='/signin' >signin </Link>
            </div> :
            <div>
                Email not confirmed
            </div>
    )
}

EmailAuth.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string,
        }),
    }).isRequired,
}
