import React, { useState } from "react";

function usePagination(data, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    React.useEffect(() => {
        // 最大ページが現在のページ以下 (検索結果によってページ数が減る)
        if (Math.ceil(data.length / itemsPerPage) < currentPage) {
            setCurrentPage(Math.ceil(data.length / itemsPerPage))
            return
        }

        // 検索結果なしから、検索結果ありになった場合
        if (currentPage === 0 && data.length > 0) {
            setCurrentPage(1)
            return
        }
        // 現在のページデータがない場合 (最後のページでコンテンツを削除)
        if (currentData().length === 0 && data.length > 0) {
            setCurrentPage(prev => prev - 1)
            return
        }


    }, [data])

    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    function next() {
        setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
    }

    function prev() {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    }

    function jump(page) {
        const pageNumber = Math.max(1, page);
        setCurrentPage(Math.min(pageNumber, maxPage));
    }

    return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePagination;
