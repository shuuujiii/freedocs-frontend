import React from 'react'
export const SORT = {
    URL_DESC: "URL_DESC",
    URL_ASC: "URL_ASC",
}
const initialSortState = {
    key: '_id.url',
    value: SORT.URL_ASC,
    order: 1,
}
const sortReducer = (state, action) => {
    switch (action.type) {
        case SORT.URL_DESC:
            return {
                key: '_id.url',
                value: SORT.URL_DESC,
                order: -1,
            };
        case SORT.URL_ASC:
            return initialSortState
        default:
            return initialSortState;
    }
}

export const useSortReducer = () => {
    return React.useReducer(sortReducer, initialSortState)
}
