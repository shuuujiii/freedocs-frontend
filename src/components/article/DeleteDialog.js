import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axiosbase from '../../utils/axiosbase'
import { useMessage } from '../../provider/messageProvider'
import { useError } from '../../provider/errorProvider'
export default function DeleteDialog({ open, handleClose, _id }) {
    const message = useMessage()
    const error = useError()
    const onClickDelete = () => {
        axiosbase.delete('/article', { data: { _id: _id } }).then(
            () => {
                message.successMessage('contents deleted')
                window.location.reload()
            }
        ).catch(err => {
            error.setError(err)
        }).finally(
            handleClose()
        )
    }
    return (
        <div>
            <Dialog
                data-testid='delete-dialog'
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-title"
                    data-testid='delete-dialog-title'
                >{"Delete Item"}</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        data-testid='delete-dialog-message'
                        id="alert-dialog-description">
                        Are you sure you want to delete this item? This cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        data-testid='delete-dialog-button'
                        onClick={onClickDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

DeleteDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    _id: PropTypes.string,
}