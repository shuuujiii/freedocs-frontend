import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Pagination from '@material-ui/lab/Pagination';
// utils
import axiosbase from '../../utils/axiosbase'
import useLocalStorage from '../../utils/useLocalStrage'

// provider
import { useAuth } from '../../provider/authProvider';
import { useSortReducer } from '../article/sortReducer';

// components
import SortSelect from '../../components/article/sortSelect'
import CreateArticle from '../article/createArticle'
import ArticleCard from '../article/articleCard'
import Switches from '../article/favoriteSwitch'
const ArticlesPage = ({ search = '' }) => {
    // const error = useError();
    // const classes = useStyles();
    // const history = useHistory();
    const auth = useAuth();
    const [articles, setArticles] = React.useState([]);
    const [sort, dispatchSort] = useSortReducer();
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0)
    const [isFavoriteOnly, setIsFavoriteOnly] = useLocalStorage('showFavorite', 'false')

    const handleChange = (e, p) => {
        e.preventDefault()
        setPage(p);
    };

    const handleChangeSwitch = () => {
        setIsFavoriteOnly(isFavoriteOnly === 'true' ? 'false' : 'true')
    }

    React.useEffect(() => {
        let mounted = true
        const getData = async () => {
            let p = new URLSearchParams();
            p.append('search', search);
            p.append('page', page)
            p.append('sortkey', sort.key)
            p.append('order', sort.order)
            p.append('isFavoriteOnly', isFavoriteOnly)
            const res = await axiosbase.get('/article/user?' + p)
            if (mounted) {
                setArticles(res.data.docs);
                setTotalPages(res.data.totalPages)
            }
        }
        getData()
        return () => mounted = false
    }, [search, page, sort, auth.authState.user, isFavoriteOnly])

    return (
        <div>
            <Container maxWidth="lg">
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={8}>
                        <CreateArticle setArticles={setArticles} />
                        <div id='main'></div>
                        <SortSelect sort={sort} dispatchSort={dispatchSort} />
                        <Switches checked={isFavoriteOnly === 'true'} setChecked={handleChangeSwitch} />
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
    search: PropTypes.string,
}

export default ArticlesPage;