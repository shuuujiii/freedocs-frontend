import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';

// utils
import axios from 'axios';
import { useError } from '../../provider/errorProvider';
// component
import TagChips from './tagChips'
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

const Tags = ({ tags, setTags }) => {
    const classes = useStyles();
    const error = useError();
    const [inputTag, setInputTag] = React.useState('')

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            axios.post(process.env.REACT_APP_API + '/tag', {
                name: inputTag
            })
                .then(res => {
                    setTags(prev => [...prev, res.data])
                    setInputTag('')
                }).catch(error.setError)
        }
    }
    return (
        <Paper
            elevation={0}
            component="ul"
            className={classes.root}
        >
            <TagChips tags={tags} setTags={setTags} deletable={true} />
            <TextField
                style={{ outlineWidth: '0' }}
                value={inputTag}
                onChange={e => { setInputTag(e.target.value) }}
                onKeyPress={handleKeyPress}
                placeholder={'input tag'}
            />
        </Paper>
    );
}
Tags.propTypes = {
    tags: PropTypes.array,
    setTags: PropTypes.func,
}
export default Tags