import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Pagination from '@material-ui/lab/Pagination';
// utils
// import axios from 'axios'
import axiosbase from '../../utils/axiosbase'
import usePagination from "../../utils/usePagination";
import { useError } from '../../provider/errorProvider';
import { useAuth } from '../../provider/authProvider';
import { useSortReducer } from '../article/sortReducer';
import { useHistory } from 'react-router-dom'

// components
import TagChips from '../../components/article/tagChips'
import SortSelect from '../../components/article/sortSelect'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(1),
        margin: 'auto',
        alignItems: 'center',
    }
}));

const Home = ({ search }) => {
    const error = useError();
    const classes = useStyles();
    const history = useHistory();
    const auth = useAuth();
    const [articles, setArticles] = React.useState([]);
    const [sort, dispatchSort] = useSortReducer();
    const [page, setPage] = React.useState(1);
    const PER_PAGE = 10;

    const count = Math.ceil(articles.length / PER_PAGE);
    const _DATA = usePagination(articles, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    const onClickLikes = (id, isFavorite) => {
        auth.authState.isAuthenticated ?
            axiosbase.post('/article/likes', {
                _id: id,
                likes: !isFavorite,
            }).then(res => {
                setArticles(prev => {
                    return prev.map(article =>
                        article._id === res.data[0]._id ? res.data[0] : article
                    )
                })
            })
            :
            history.push('/signin')
    }
    React.useEffect(() => {
        let p = new URLSearchParams();
        p.append('search', search);
        axiosbase.get('/article/all?' + p)
            .then(res => {
                console.log('all article', res.data)
                setArticles(res.data);
            })
            .catch(error.setError)
    }, [search])


    const setLikeColor = (isFavorite) => {
        return isFavorite ? "secondary" : "inherit"
    }
    React.useMemo(() => {
        const fixHierarychKey = (y, key) => {
            const x = key.split('.')
            const keyName = x[0]
            if (x.length === 1) {
                return y[x[0]]
            }
            const nextKeyName = x[1];
            return fixHierarychKey(y[keyName], nextKeyName)
        }
        articles.sort((a, b) => {
            a = fixHierarychKey(a, sort.key);
            b = fixHierarychKey(b, sort.key);
            return (a === b ? 0 : a > b ? 1 : -1) * sort.order;
        })
        // return tmpt
    }, [sort, articles])

    return (
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <SortSelect sort={sort} dispatchSort={dispatchSort} />
            {_DATA.currentData().map(article => {
                return (
                    <div
                        key={article._id}
                        style={{ marginBottom: '10px' }}
                    >
                        <Card>
                            <CardContent>
                                <Paper
                                    elevation={0}
                                    component="ul"
                                    className={classes.root}
                                >
                                    <TagChips
                                        tags={article.tags}
                                        setTags={() => { }}
                                        deletable={false} />
                                </Paper>
                            </CardContent>
                            <CardContent>
                                <Link to={{ pathname: article?.url || '#' }} target='_blank' >{article.url}</Link>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton
                                    color={setLikeColor(article.isFavorite)}
                                    aria-label="add to favorites"
                                    onClick={() => { onClickLikes(article._id, article.isFavorite) }}>
                                    <FavoriteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </div>
                )
            })}
            <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
            />
        </div>
    )
}

Home.propTypes = {
    search: PropTypes.string,
}

export default Home;