import React from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import ReportIcon from '@material-ui/icons/Report';
import EditIcon from '@material-ui/icons/Edit';
// import Badge from '@material-ui/core/Badge';

import moment from 'moment'
// provider
import { useAuth } from '../../provider/authProvider';
// import { useError } from '../../provider/errorProvider'
// import { useMessage } from '../../provider/messageProvider'
// components
import { TagChips } from './Tags'
import Comments from '../article/comments'
import ReportDialog from './Report'
import EditArticle from './editArticle'
import ArticleCardFavoriteButton from './ArticleCardFavoriteButton'
import ArticleVote from './ArticleVote'
import ArticleCardDeleteButton from './ArticleCardDeleteButton'

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