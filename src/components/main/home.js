import React from 'react'
import PropTypes from 'prop-types'
import Pagination from '@material-ui/lab/Pagination';
// utils
import axiosbase from '../../utils/axiosbase'

// provider
import { useAuth } from '../../provider/authProvider';
import { useSortReducer } from '../article/sortReducer';

// components
import SortSelect from '../../components/article/sortSelect'
import CreateArticle from '../article/createArticle'
import ArticleCard from '../article/articleCard'

const Home = ({ search = '' }) => {
    // const error = useError();
    // const classes = useStyles();
    // const history = useHistory();
    const auth = useAuth();
    const [articles, setArticles] = React.useState([]);
    const [sort, dispatchSort] = useSortReducer();
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0)

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
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            {auth.authState.isAuthenticated &&
                <CreateArticle setArticles={setArticles} />}
            {articles.length === 0 ?
                <div>No articles</div> :
                <div>
                    <SortSelect sort={sort} dispatchSort={dispatchSort} />
                    <Pagination
                        count={totalPages}
                        size="large"
                        page={page}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChange}
                    />
                    {articles.map(article => {
                        return (
                            <div
                                key={article._id}
                                style={{ marginBottom: '10px' }}
                            >
                                <ArticleCard article={article} setArticles={setArticles} />
                            </div>
                        )
                    })}
                    <Pagination
                        count={totalPages}
                        size="large"
                        page={page}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChange}
                    />
                </div>
            }
        </div>

    )
}

Home.propTypes = {
    search: PropTypes.string,
}

export default Home;