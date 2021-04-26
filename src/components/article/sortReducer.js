import React from 'react'
export const SORT = {
    URL_DESC: "URL_DESC",
    URL_ASC: "URL_ASC",
    LIKES_DESC: "LIKES_DESC",
    LIKES_ASC: "LIKES_ASC",
    GOOD_DESC: "GOOD_DESC",
    GOOD_ASC: "GOOD_ASC",
    BAD_DESC: "BAD_DESC",
    BAD_ASC: "BAD_ASC",
}
const initialSortState = {
    key: 'url',
    // value: SORT.URL_ASC,
    order: 'asc',
}
const sortReducer = (state, action) => {
    switch (action.type) {
        case SORT.URL_DESC:
            return {
                key: 'url',
                // value: SORT.URL_DESC,
                order: 'desc',
            };
        case SORT.URL_ASC:
            return initialSortState
        case SORT.LIKES_DESC:
            return {
                key: 'likeCount',
                order: 'desc',
            }
        case SORT.LIKES_ASC:
            return {
                key: 'likeCount',
                order: 'asc',
            }
        case SORT.GOOD_DESC:
            return {
                key: 'goodCount',
                order: 'desc',
            }
        case SORT.GOOD_ASC:
            return {
                key: 'goodCount',
                order: 'asc',
            }
        case SORT.BAD_DESC:
            return {
                key: 'badCount',
                order: 'desc',
            }

        case SORT.BAD_ASC:
            return {
                key: "badCount",
                order: 'asc',
            }
        default:
            return initialSortState;
    }
}

export const useSortReducer = () => {
    return React.useReducer(sortReducer, initialSortState)
}
