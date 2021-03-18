import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';

// utils
import axios from 'axios';
import { useError } from '../../provider/errorProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 'auto',
        minHeight: '50px',
        alignItems: 'center'
    },
    chip: {
        margin: theme.spacing(0.5),
    },
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
    const handleDelete = (id) => {
        setTags(prev => prev.filter(tag => tag._id !== id))
    }

    return (
        <Paper component="ul" className={classes.root}>
            {tags.map(tag => {
                return (
                    <li key={tag._id}>
                        <Chip
                            label={tag.name}
                            onDelete={() => { handleDelete(tag._id) }}
                            className={classes.chip}
                        />
                    </li>
                )
            })}
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