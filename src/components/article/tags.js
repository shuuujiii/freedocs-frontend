import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

// utils
import axiosbase from '../../utils/axiosbase'
import { useError } from '../../provider/errorProvider';
import { useHistory } from 'react-router-dom'
// component
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
        boxSizing: 'border-box'
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
            // e.preventDefault()
            axiosbase.post('/tag', {
                name: inputTag
            }).then(res => {
                setTags(prev => [...prev, res.data])
                // can't pass test when writing here
                // setInputTag('')
            }).catch(e => {
                console.log(e)
            })
            setInputTag('')
        }
    }

    const handleDelete = (id) => {
        setTags(prev => prev.filter(tag => tag._id !== id))
    }

    return (
        <div
            data-testid='tags'
            className={classes.root}>
            {tags.map(tag => {
                return (
                    <Chip
                        data-testid='tag-chip'
                        key={tag._id}
                        className={classes.chip}
                        label={tag.name}
                        onDelete={() => { handleDelete(tag._id) }}
                    />
                )
            })}
            <TextField
                autoFocus
                data-testid='tag-textfield'
                style={{ outlineWidth: '0' }}
                value={inputTag}
                onChange={e => { setInputTag(e.target.value) }}
                onKeyPress={handleKeyPress}
                placeholder={'input tag'}
            />
        </div>
    )
}

Tags.propTypes = {
    tags: PropTypes.array,
    setTags: PropTypes.func,
}

export const TagChips = ({ tags }) => {
    const classes = useStyles();
    const history = useHistory()

    const onClickChip = (tagname) => {
        history.push(`/lists?tag=${tagname}`)
    }
    return (
        <div className={classes.root}>
            {tags.map(tag => {
                return (
                    <Chip
                        key={tag._id}
                        className={classes.chip}
                        label={tag.name}
                        onClick={() => { onClickChip(tag.name) }}
                    />
                )
            })}
        </div>
    );
}
TagChips.propTypes = {
    tags: PropTypes.array,
}

