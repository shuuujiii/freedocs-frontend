import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from './DeleteDialog'

const ArticleCardDeleteButton = ({ article_id }) => {
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleCloseDelete = () => {
        setOpenDelete(false)
    }
    const handleClickDelete = () => {
        setOpenDelete(true)
    }
    return (
        <React.Fragment>
            <IconButton
                data-testid="article-card-delete-icon-button"
                style={{ marginLeft: 'auto' }}
                coler="default"
                onClick={handleClickDelete}
                aria-label="delete"
            >
                <DeleteIcon />
            </IconButton>
            <DeleteDialog open={openDelete} handleClose={handleCloseDelete} _id={article_id} />
        </React.Fragment>
    )
}

ArticleCardDeleteButton.propTypes = {
    article_id: PropTypes.string,
}
export default ArticleCardDeleteButton