import axios from 'axios'
const axiosbase = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API
})

export default axiosbase