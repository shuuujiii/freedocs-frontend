import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

// utils
import axiosbase from '../../utils/axiosbase'
import { useError } from '../../provider/errorProvider';
// component
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(1),
        margin: 'auto',
        alignItems: 'center',
    },
    chip: {
        marginRight: theme.spacing(0.5),
    },
}));

export const Tags = ({ tags, setTags }) => {
    const classes = useStyles();
    const error = useError();
    const [inputTag, setInputTag] = React.useState('')
    const handleKeyPress = (e) => {
        error.init()
        if (e.key === 'Enter') {
            e.preventDefault()
            axiosbase.post('/tag', {
                name: inputTag
            })
                .then(res => {
                    console.log(res.data)
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
            <DeletableTagChips tags={tags} setTags={setTags} />
            <TextField
                style={{ outlineWidth: '0' }}
                value={inputTag}
                onChange={e => { setInputTag(e.target.value) }}
                onKeyPress={handleKeyPress}
                placeholder={'input tag'}
            />
        </Paper>
    )
}

Tags.propTypes = {
    tags: PropTypes.array,
    setTags: PropTypes.func,
}

export const TagChips = ({ tags }) => {
    const classes = useStyles();
    return (
        tags.map(tag => {
            return (
                <li key={tag._id}>
                    <Chip
                        className={classes.chip}
                        label={tag.name}
                    />
                </li>
            )
        })
    );
}
TagChips.propTypes = {
    tags: PropTypes.array,
}

export const DeletableTagChips = ({ tags, setTags }) => {
    const classes = useStyles();
    const handleDelete = (id) => {
        setTags(prev => prev.filter(tag => tag._id !== id))
    }
    return (
        tags.map(tag => {
            return (
                <li key={tag._id}>
                    <Chip
                        className={classes.chip}
                        label={tag.name}
                        onDelete={() => { handleDelete(tag._id) }}
                    />
                </li>
            )
        })
    );
}

DeletableTagChips.propTypes = {
    tags: PropTypes.array,
    onDelete: PropTypes.func,
}
