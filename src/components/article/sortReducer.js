import React from 'react'
export const SORT = {
    // URL_DESC: "URL_DESC",
    // URL_ASC: "URL_ASC",
    LIKES_DESC: "LIKES_DESC",
    LIKES_ASC: "LIKES_ASC",
    CREATED_AT_DESC: 'CREATE_AT_DESC',
    CREATED_AT_ASC: 'CREATE_AT_ASC',
    // GOOD_DESC: "GOOD_DESC",
    // GOOD_ASC: "GOOD_ASC",
    // BAD_DESC: "BAD_DESC",
    // BAD_ASC: "BAD_ASC",
}
const initialSortState = {
    key: 'likeCount',
    value: SORT.LIKES_DESC,
    order: 'desc',
}
const sortReducer = (state, action) => {
    // console.log('sortreducer')
    switch (action.type) {
        // case SORT.URL_DESC:
        //     return {
        //         key: 'url',
        //         // value: SORT.URL_DESC,
        //         order: 'desc',
        //     };
        // case SORT.URL_ASC:
        //     return initialSortState
        case SORT.LIKES_DESC:
            return {
                key: 'likeCount',
                value: SORT.LIKES_DESC,
                order: 'desc',
            }
        case SORT.LIKES_ASC:
            return {
                key: 'likeCount',
                value: SORT.LIKES_ASC,
                order: 'asc',
            }
        case SORT.CREATED_AT_DESC:
            return {
                key: 'createdAt',
                value: SORT.CREATED_AT_DESC,
                order: 'desc',
            }
        case SORT.CREATED_AT_ASC:
            return {
                key: 'createdAt',
                value: SORT.CREATED_AT_ASC,

                order: 'asc',
            }
        // case SORT.GOOD_DESC:
        //     return {
        //         key: 'goodCount',
        //         order: 'desc',
        //     }
        // case SORT.GOOD_ASC:
        //     return {
        //         key: 'goodCount',
        //         order: 'asc',
        //     }

        default:
            return initialSortState;
    }
}

export const useSortReducer = () => {
    return React.useReducer(sortReducer, initialSortState)
}
