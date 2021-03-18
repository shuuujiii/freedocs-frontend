import React from 'react'
import PropTypes from 'prop-types'
// material-ui
// import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import usePagination from "../../utils/usePagination";

// utils
import axios from 'axios'
import { useError } from '../../provider/errorProvider'
import { useMessage } from '../../provider/messageProvider'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
    },
    control: {
        padding: theme.spacing(2),
    },
}));
export default function Articles({ articles, setArticles }) {
    const classes = useStyles();
    const error = useError();
    const message = useMessage();

    const [page, setPage] = React.useState(1);
    const PER_PAGE = 10;

    const count = Math.ceil(articles.length / PER_PAGE);
    const _DATA = usePagination(articles, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };
    const onClickDelete = (e, id) => {
        e.preventDefault()
        axios.delete(process.env.REACT_APP_API + '/article', {
            data: {
                _id: id
            }
        }).then(() => {
            axios.get(process.env.REACT_APP_API + '/article')
                .then(res => {
                    setArticles(res.data)
                    message.successMessage('deleted')
                }).catch(err => { console.log(err) })
        }
        ).catch(err => {
            error.setErrorState({
                hasError: true,
                message: err.response?.data?.message || err.message
            })
        })
    }
    return (
        <div>
            <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
            />
            <Grid container justify="center" spacing={2}>
                {_DATA.currentData().map((article) => (
                    <Grid item xs={12} key={article._id}>
                        <Paper className={classes.paper} variant='outlined'>
                            <div> {article.title}</div>
                            <div> {article.url}</div>
                            <div>
                                <Button
                                    variant="contained"
                                    onClick={e => { onClickDelete(e, article._id) }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

Articles.propTypes = {
    articles: PropTypes.array,
    setArticles: PropTypes.func
}