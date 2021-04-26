import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// reducer
import { SORT } from './sortReducer'
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SortSelect({ sort, dispatchSort }) {
    const classes = useStyles();
    const handleChange = (event) => {
        dispatchSort({ type: event.target.value })
    };
    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Sort</InputLabel>
                <Select
                    native
                    value={sort.value}
                    onChange={handleChange}
                    label="sort"
                    inputProps={{
                        name: 'sort',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option value={SORT.URL_ASC}>URL(asc)</option>
                    <option value={SORT.URL_DESC}>URL(desc)</option>
                    <option value={SORT.LIKES_ASC}>like(asc)</option>
                    <option value={SORT.LIKES_DESC}>like(desc)</option>
                    <option value={SORT.GOOD_ASC}>good(asc)</option>
                    <option value={SORT.GOOD_DESC}>good(desc)</option>
                    <option value={SORT.BAD_ASC}>bad(desc)</option>
                    <option value={SORT.BAD_DESC}>bad(asc)</option>

                </Select>
            </FormControl>
        </div>
    );
}

SortSelect.propTypes = {
    sort: PropTypes.object,
    dispatchSort: PropTypes.func,
}
