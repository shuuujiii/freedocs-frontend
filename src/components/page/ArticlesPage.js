import React from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams, useLocation } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination';
// utils
import axiosbase from '../../utils/axiosbase'
import useLocalStorage from '../../utils/useLocalStrage'

// provider
import { useAuth } from '../../provider/authProvider';

// components
import { SortSelect, initialSortValue } from '../article/sortSelect'
import CreateArticle from '../article/createArticle'
import ArticleCard from '../article/articleCard'
// const useQuery = () => {
//     return new URLSearchParams(useLocation().search);
// }

const ArticlesPage = () => {
    const params = useParams()
    const auth = useAuth();
    // const query = useQuery();
    const query = useLocation().search
    let qp = qs.parse(query)
    // const [search, setSearch] = React.useState('')
    const [articles, setArticles] = React.useState([]);
    // const [sort, dispatchSort] = useSortReducer();
    const [sort, dispatchSort] = useLocalStorage('sort', initialSortValue)
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0)
    const handleChange = (e, p) => {
        e.preventDefault()
        setPage(p);
    };

    const createParams = (search) => {
        let p = new URLSearchParams();
        if (search) {
            p.append('search', search)
        }
        p.append('page', page)
        p.append('sortkey', sort.key)
        p.append('order', sort.order)
        return p
    }

    React.useEffect(() => {
        console.log('page useEffect')
        let mounted = true
        const getData = async () => {
            let p = createParams(qp.search)
            if (qp.tag) {
                p.append('tag', qp.tag)
            }
            if (qp.user) {
                p.append('username', qp.user)
            }
            if (qp.favorite) {
                p.append('favorite', qp.favorite)
            }
            const res = await axiosbase.get('/article/lists?' + p)
            if (mounted) {
                setArticles(res.data.docs);
                setTotalPages(res.data.totalPages)
            }
        }
        getData()
        return () => mounted = false
        // }, [search, page, sort, auth.authState.user, isFavoriteOnly])
    }, [query, page, sort, auth.authState.user])
    // }, [page, sort, auth.authState.user, params.tag])



    return (
        <div>
            {qp.tag &&
                <div>
                    <Typography variant="h4" align="center" color="textSecondary">Tagged #{qp.tag}</Typography>
                </div>
            }
            {qp.user &&
                <div>
                    <Typography variant="h4" align="center" color="textSecondary">Posted @{qp.user}</Typography>
                </div>
            }
            <Container maxWidth="lg">
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={8}>
                        {auth.authState.user && <CreateArticle setArticles={setArticles} />}
                        <SortSelect sort={sort} dispatchSort={dispatchSort} />
                        {articles.length === 0 ?
                            <div>No articles</div> :
                            <div>
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
                    </Grid>
                </Grid>
            </Container>
        </div >
    )
}

ArticlesPage.propTypes = {
    props: PropTypes.object,
    // search: PropTypes.string,
}

export default ArticlesPage;