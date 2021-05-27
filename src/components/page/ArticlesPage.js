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

// components
import ArticleCard from '../article/articleCard'
import Loading from '../common/Loading'
const ArticlesPage = () => {
    const auth = useAuth();
    const history = useHistory()
    const query = useLocation().search
    let qp = qs.parse(query)
    const [articles, setArticles] = React.useState(null);
    // const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0)
    const [loading, setLoading] = React.useState(true)
    const handleChange = (e, page) => {
        e.preventDefault()
        let p = new URLSearchParams();
        if (qp.tag) {
            p.append('tag', qp.tag)
        }
        if (qp.author) {
            p.append('author', qp.author)
        }
        if (qp.favorite) {
            p.append('favorite', qp.favorite)
        }
        if (qp.search) {
            p.append('search', qp.search)
        }
        p.append('page', page)
        p.append('sortkey', qp.sortkey || 'createdAt')
        p.append('order', qp.sortorder || 'desc')
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
                console.log(e)
                setLoading(false)
            })
    }, [query, auth.authState.user])

    if (auth.authState.loading) {
        return <Loading />
    }
    if (loading) {
        return <Loading />
    }
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
                        {articles.length === 0 ?
                            <div>No articles</div> :
                            <div style={{ marginTop: '16px' }}>
                                <Pagination
                                    count={totalPages}
                                    size="large"
                                    page={Number(qp.page) || 1}
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
                                    page={Number(qp.page) || 1}
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