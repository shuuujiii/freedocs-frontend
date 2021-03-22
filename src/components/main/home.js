import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

// utils
import axios from 'axios'
import { useError } from '../../provider/errorProvider'

// components
import TagChips from '../../components/article/tagChips'

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

const Home = () => {
    const error = useError();
    const classes = useStyles();
    const [articles, setArticles] = React.useState([]);

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/main')
            .then(res => {
                setArticles(res.data);
            })
            .catch(error.setError)
    }, [])

    return (
        <div style={{ marginTop: '10px' }}>
            {articles.map(article => {
                return (
                    <div
                        key={article._id.url}
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
                                <div>{article._id.url}</div>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default Home;