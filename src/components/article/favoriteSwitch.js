import React from 'react';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types'
export default function Switches({ checked = false, setChecked }) {
    // const [checkFavorite, setState] = React.useState(false);

    return (
        <div>
            <Switch
                checked={checked}
                onChange={setChecked}
                name="checkFavorite"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        </div>
    );
}


Switches.propTypes = {
    checked: PropTypes.bool,
    setChecked: PropTypes.func,
}
