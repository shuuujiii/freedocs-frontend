import React from 'react'
export const SORT = {
    URL_DESC: "URL_DESC",
    URL_ASC: "URL_ASC",
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
        default:
            return initialSortState;
    }
}

export const useSortReducer = () => {
    return React.useReducer(sortReducer, initialSortState)
}
