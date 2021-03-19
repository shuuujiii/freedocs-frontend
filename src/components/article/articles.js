import React from 'react'
import PropTypes from 'prop-types'
// material-ui
import Pagination from '@material-ui/lab/Pagination';
import usePagination from "../../utils/usePagination";

// component
import Article from './article'
export default function Articles({ articles, setArticles }) {
    const [page, setPage] = React.useState(1);
    const PER_PAGE = 10;

    const count = Math.ceil(articles.length / PER_PAGE);
    const _DATA = usePagination(articles, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <div>
            {_DATA.currentData().map((article) => (
                <Article
                    key={article._id}
                    article={article}
                    setArticles={setArticles}
                />
            ))}
            <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
            />
        </div >
    )
}

Articles.propTypes = {
    articles: PropTypes.array,
    setArticles: PropTypes.func
}