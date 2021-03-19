import React from 'react'
import PropTypes from 'prop-types'
// material-ui
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
// icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// utils
import axios from 'axios'
import { useError } from '../../provider/errorProvider'
import { useMessage } from '../../provider/messageProvider'

//components
import EditArticle from './editArticle'
import TagChips from './tagChips'

const useStyles = makeStyles((theme) => ({
    tagPaper: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 'auto',
        minHeight: '50px',
        alignItems: 'center',
    },

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
                }).catch(error.setError)
        }
        ).catch(error.setError)
    }

    const onClickEdit = (e) => {
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
                <Paper>

                    <Box
                        display="flex"
                        flexDirection="column"
                        p={1}
                        m={1}
                    >
                        <Box>
                            <Paper
                                elevation={0}
                                component="ul"
                                className={classes.tagPaper}>
                                <TagChips tags={article.tags} setTags={() => { }} deletable={false} />
                            </Paper>
                        </Box>
                        <Box display="flex" flexDirection='row'>
                            <Box display="flex"
                                flexGrow={1}
                                alignItems="center"
                                alignContent="center">
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
                        </Box>
                    </Box>
                </Paper>

            }
        </div >
    )
}

Article.propTypes = {
    article: PropTypes.object,
    setArticles: PropTypes.func,
}

export default Article