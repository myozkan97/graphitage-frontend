import * as actionTypes from "./actionTypes"
import httpReq from "./utils/http"

const baseUrl = "https://graphitage.herokuapp.com/api.graphitage.com/"

const saveSearchResultsAnd = (res) => {
    return {
        type: actionTypes.FETCH_SEARCH_RESULTS_AND,
        newNodes: res,
    }
}

export const fetchSearchResultsAnd = (info) => {
    return (dispatch, getState) => {
        // async get proccess

        httpReq(
            baseUrl +
                "papers/searchWithAND/" +
                info.Title +
                "," +
                info.Dataset +
                "," +
                info.LibraryName +
                "," +
                info.PublishDate +
                "," +
                info.Readers +
                "," +
                info.Keywords,
            "GET"
        ).then((result) => {
            // console.log(result.data)
            dispatch(saveSearchResultsAnd(result.data))
        })
    }
}
