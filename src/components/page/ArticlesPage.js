import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination';
// utils
import axiosbase from '../../utils/axiosbase'
import useLocalStorage from '../../utils/useLocalStrage'

// provider
import { useAuth } from '../../provider/authProvider';
// import { useSortReducer } from '../article/sortReducer';

// components
import { SortSelect, initialSortValue } from '../article/sortSelect'
import CreateArticle from '../article/createArticle'
import ArticleCard from '../article/articleCard'
// import Switches from '../article/favoriteSwitch'



const ArticlesPage = (search = '') => {
    const params = useParams()
    const auth = useAuth();
    const [articles, setArticles] = React.useState([]);
    // const [sort, dispatchSort] = useSortReducer();
    const [sort, dispatchSort] = useLocalStorage('sort', initialSortValue)
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0)
    // const [isFavoriteOnly, setIsFavoriteOnly] = useLocalStorage('showFavorite', 'false')

    const handleChange = (e, p) => {
        e.preventDefault()
        setPage(p);
    };

    // const handleChangeSwitch = () => {
    //     setIsFavoriteOnly(isFavoriteOnly === 'true' ? 'false' : 'true')
    // }

    React.useEffect(() => {
        let mounted = true
        const getData = async () => {
            let p = new URLSearchParams();
            p.append('search', search);
            p.append('page', page)
            p.append('sortkey', sort.key)
            p.append('order', sort.order)
            if (params.tag) {
                p.append('tag', params.tag)
            }
            if (params.user) {
                console.log('param user', params.user)
                p.append('username', params.user)
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
    }, [search, page, sort, auth.authState.user, params.tag])


    return (
        <div>
            {params.tag &&
                <div>
                    <Typography variant="h4" align="center" color="textSecondary">Tagged #{params.tag}</Typography>
                </div>
            }
            {params.user &&
                <div>
                    <Typography variant="h4" align="center" color="textSecondary">Posted @{params.user}</Typography>
                </div>
            }
            <Container maxWidth="lg">
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={8}>
                        {auth.authState.user && <CreateArticle setArticles={setArticles} />}

                        <SortSelect sort={sort} dispatchSort={dispatchSort} />
                        {/* {auth.authState.user && <Switches checked={isFavoriteOnly === 'true'} setChecked={handleChangeSwitch} />} */}

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