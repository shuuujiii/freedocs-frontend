import React from 'react'
// import PropTypes from 'prop-types'
import qs from 'query-string'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useLocation, useHistory } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination';
// utils
import axiosbase from '../../utils/axiosbase'
// provider
import { useAuth } from '../../provider/authProvider';
import { useError } from '../../provider/errorProvider';

// components
import ArticleCard from '../article/articleCard'
import Loading from '../common/Loading'
const ArticlesPage = () => {
    const auth = useAuth();
    const history = useHistory()
    const error = useError()
    const query = useLocation().search
    const parsedQuery = qs.parse(query)
    const [articles, setArticles] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(0)
    const [loading, setLoading] = React.useState(true)
    const updateQuery = (params) => {
        let p = new URLSearchParams();
        const updated = Object.assign(parsedQuery, params)
        Object.keys(updated).forEach(key => { p.append(key, updated[key]) })
        return p
    }
    const handleChange = (e, page) => {
        e.preventDefault()
        const p = updateQuery({ page })
        history.push(`/lists?${p}`)
    };

    React.useEffect(() => {
        if (auth.authState.isLoading) {
            return
        }
        setLoading(true)
        axiosbase.get('/article/lists' + query)
            .then(res => {
                setArticles(res.data.docs);
                setTotalPages(res.data.totalPages)
                setLoading(false)
            })
            .catch(e => {
                error.setError(e)
                setLoading(false)
            })
    }, [query, auth.authState])

    if (auth.authState.loading) {
        return <Loading />
    }
    if (loading) {
        return <Loading />
    }
    return (
        <div>
            {parsedQuery.tag &&
                <div>
                    <Typography variant="h4" align="center" color="textSecondary">Tagged #{parsedQuery.tag}</Typography>
                </div>
            }
            {parsedQuery.user &&
                <div>
                    <Typography variant="h4" align="center" color="textSecondary">Posted @{parsedQuery.user}</Typography>
                </div>
            }

            <Container maxWidth="lg">
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={8}>
                        {articles.length === 0 ?
                            <div>No articles</div> :
                            <div style={{ marginTop: '16px' }}>
                                <Pagination
                                    count={totalPages}
                                    size="large"
                                    page={Number(parsedQuery.page) || 1}
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
                                    page={Number(parsedQuery.page) || 1}
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

// ArticlesPage.propTypes = {
//     props: PropTypes.object,
//     // search: PropTypes.string,
// }

export default ArticlesPage;