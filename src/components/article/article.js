import React from 'react'
import PropTypes from 'prop-types'
// material-ui
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// utils
import axios from 'axios'
import { useError } from '../../provider/errorProvider'
import { useMessage } from '../../provider/messageProvider'

//components
import EditArticle from './editArticle'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        // minHeight: 40,
    },
    control: {
        padding: theme.spacing(2),
    },
    editButton: {
        backgroundColor: 'green.300'
    }
}));
const Article = ({ article, setArticles }) => {
    const classes = useStyles();
    const error = useError();
    const message = useMessage();
    const [isEdit, setIsEdit] = React.useState(false)

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

    const onClickEdit = (e, id) => {
        e.preventDefault()
        setIsEdit(true)
    }
    return (
        <div style={{ width: '100%' }}>
            {isEdit ?
                <EditArticle
                    setIsEdit={setIsEdit}
                    article={article}
                    setArticles={setArticles}
                />
                :
                <Box
                    display="flex"
                    flexDirection="row"
                    p={1}
                    m={1}
                    bgcolor="grey.200"
                >
                    <Box display="flex" flexGrow={1} alignItems="center" alignContent="center">
                        {article.url}
                    </Box>
                    <Box className={classes.editButton}>
                        <Button>
                            <EditIcon
                                variant="contained"
                                onClick={e => { onClickEdit(e, article._id) }}
                            />
                        </Button>
                        <Button>
                            <DeleteIcon
                                variant="contained"
                                onClick={e => { onClickDelete(e, article._id) }}
                            />
                        </Button>
                    </Box>
                </Box>}
        </div>
    )
}

Article.propTypes = {
    article: PropTypes.object,
    setArticles: PropTypes.func,
}

export default Article