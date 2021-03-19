import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

// utils
const useStyles = makeStyles((theme) => ({
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const TagChips = ({ tags, setTags, deletable }) => {
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
                        onDelete={deletable ? () => { handleDelete(tag._id) } : undefined}
                    />
                </li>
            )
        })
    );
}
TagChips.propTypes = {
    tags: PropTypes.array,
    setTags: PropTypes.func,
    deletable: PropTypes.bool
}
export default TagChips