import React from 'react';
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

// util
import axiosbase from '../../utils/axiosbase'
import { useMessage } from '../../provider/messageProvider';
import { useError } from '../../provider/errorProvider'

export default function ReportDialog({ open, handleClose, article_id }) {
    const message = useMessage();
    const error = useError();
    const [detail, setDetail] = React.useState('')
    const [radioButtonValue, setRadioButtonValue] = React.useState('other');

    const handleChangeRadioButton = (event) => {
        setRadioButtonValue(event.target.value);
    };

    const init = () => {
        setDetail('')
        setRadioButtonValue('other')
    }

    const handleCloseInit = () => {
        init()
        handleClose()
    }

    const handleClickSendReport = async () => {
        try {
            await axiosbase.post('/report', {
                id: article_id,
                title: radioButtonValue,
                detail: detail,
            })
            message.successMessage('reported!')
            handleCloseInit()
        } catch (e) {
            error.setError(e)
        }

    }

    return (
        <Dialog open={open} onClose={handleCloseInit} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Report</DialogTitle>
            <DialogContent>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        value={radioButtonValue}
                        onChange={handleChangeRadioButton}
                    >
                        <FormControlLabel value="sex" control={<Radio />} label="性的なコンテンツ" />
                        <FormControlLabel value="violence" control={<Radio />} label="暴力的または不快なコンテンツ" />
                        <FormControlLabel value="danger" control={<Radio />} label="危険な内容" />
                        <FormControlLabel value="spam" control={<Radio />} label="スパム" />
                        <FormControlLabel value="right" control={<Radio />} label="権利に関する内容" />
                        <FormControlLabel value="tag" control={<Radio />} label="タグの不備" />
                        <FormControlLabel value="url" control={<Radio />} label="URLの不備" />
                        <FormControlLabel value="other" control={<Radio />} label="その他" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    autoFocus
                    margin="dense"
                    variant="outlined"
                    id="name"
                    label="detail"
                    type="text"
                    fullWidth
                    multiline
                    rows={3}
                    value={detail}
                    onChange={(e) => { setDetail(e.target.value) }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseInit} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClickSendReport} color="primary">
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ReportDialog.propTypes = {
    article_id: PropTypes.string,
    open: PropTypes.bool,
    handleClickOpen: PropTypes.func,
    handleClose: PropTypes.func,
}