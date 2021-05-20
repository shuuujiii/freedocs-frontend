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

    // console.log('error', error)
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
        <Dialog
            data-testid='report-form-dialog'
            open={open} onClose={handleCloseInit} aria-labelledby="form-dialog-title">
            <DialogTitle data-testid='report-title' id="report-form-dialog-title">Report</DialogTitle>
            <DialogContent>
                <FormControl component="fieldset">
                    <RadioGroup
                        data-testid='report-radio-group'
                        aria-label="report"
                        name="report"
                        value={radioButtonValue}
                        onChange={handleChangeRadioButton}
                    >
                        <FormControlLabel value="sex" control={<Radio
                            inputProps={{
                                "data-testid": `radio-button-sex`,
                            }} />} label="Sexual content" />
                        <FormControlLabel value="violence" control={<Radio
                            inputProps={{
                                "data-testid": `radio-button-violent`,
                            }} />} label="Violent or repulsive content" />
                        <FormControlLabel value="danger" control={<Radio
                            inputProps={{
                                "data-testid": `radio-button-hateful`,
                            }} />} label="Hateful or abusive content" />
                        <FormControlLabel value="spam" control={<Radio
                            inputProps={{
                                "data-testid": `radio-button-spam`,
                            }} />} label="Spam or misleading" />
                        <FormControlLabel value="tag" control={<Radio
                            inputProps={{
                                "data-testid": `radio-button-tag`,
                            }} />} label="About Tag" />
                        <FormControlLabel value="url" control={<Radio inputProps={{
                            "data-testid": `radio-button-url`,
                        }} />} label="About URL" />
                        <FormControlLabel value="other" control={<Radio inputProps={{
                            "data-testid": `radio-button-others`,
                        }} />} label="Others" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    data-testid='report-text'
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
                <Button
                    data-testid='report-cancel-button'
                    onClick={handleCloseInit} color="primary">
                    Cancel
                </Button>
                <Button
                    data-testid='report-send-button'
                    onClick={handleClickSendReport} color="primary">
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ReportDialog.propTypes = {
    article_id: PropTypes.string,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}