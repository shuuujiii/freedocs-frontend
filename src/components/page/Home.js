import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Pagination from '@material-ui/lab/Pagination';
// utils
import axiosbase from '../../utils/axiosbase'

// provider
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../provider/authProvider';
import { useSortReducer } from '../article/sortReducer';

// components
import SortSelect from '../article/sortSelect'
import ArticleCard from '../article/articleCard'
import About from '../common/about'

const Home = ({ search = '' }) => {
    const auth = useAuth();
    const [articles, setArticles] = React.useState([]);
    const [sort, dispatchSort] = useSortReducer();
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0)
    const history = useHistory();
    const handleChange = (e, p) => {
        e.preventDefault()
        setPage(p);
    };

    React.useEffect(() => {
        let mounted = true
        const getData = async () => {
            let p = new URLSearchParams();
            p.append('search', search);
            p.append('page', page)
            p.append('sortkey', sort.key)
            p.append('order', sort.order)
            const res = await axiosbase.get('/article/all?' + p)
            if (mounted) {
                setArticles(res.data.docs);
                setTotalPages(res.data.totalPages)
            }
        }
        getData()
        return () => mounted = false
    }, [search, page, sort, auth.authState.user])

    return (
        <div>
            {auth.authState.user ? <div>
                show ranking
                <button onClick={() => { history.push('/articles') }}>list</button>
            </div> : <div>
                <About />
                <div>show ranking for new user</div>
            </div>}

        </div >

    )
}

Home.propTypes = {
    search: PropTypes.string,
}

export default Home;