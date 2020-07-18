import * as actionTypes from './actionTypes';
import httpReq from './utils/http';

const baseUrl = 'https://graphitage.herokuapp.com/api.graphitage.com/';


const saveDetails = (res) => {
    return {
        type: actionTypes.FETCH_DETAILS,
        details: res
    }
}

export const fetchDetails = (id = 0) => {
    return (dispatch, getState) => {
        // async get proccess

        // fetch(url, {
        //     method: "GET",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'secret-key': '$2b$10$IS21t82Y4ZQ6qX6QPAKm6e5gfdSkfZJFLeX9E5XWKLKnXpZinECQC'
        //     }
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         dispatch(saveDetails(data));
        //         console.log(data);
        //     })

        httpReq(baseUrl + 'papers/' + id, 'GET')
        .then((result) => {
                console.log(result.data);
                dispatch(saveDetails(result.data));
            });

    }

}

