import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import ReportIcon from '@material-ui/icons/Report';
// components
import ReportDialog from './Report'
const ArticleCardReportButton = ({ user, article_id }) => {
    const history = useHistory();
    const [openReport, setOpenReport] = React.useState(false);

    const handleCloseReport = () => {
        setOpenReport(false);
    };
    const handleClickReport = () => {
        if (user) {
            setOpenReport(!openReport)
            return
        }
        history.push('/signin')
    }
    return (
        <React.Fragment>
            <IconButton
                data-testid='article-card-report-icon-button'
                style={{ marginLeft: 'auto' }}
                coler="default"
                onClick={handleClickReport}
                aria-label="report"
            >
                <ReportIcon />
            </IconButton>
            <ReportDialog
                open={openReport}
                handleClose={handleCloseReport}
                article_id={article_id} />
        </React.Fragment>
    )
}

ArticleCardReportButton.propTypes = {
    user: PropTypes.object,
    article_id: PropTypes.string,

}
export default ArticleCardReportButton