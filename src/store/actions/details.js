import * as actionTypes from './actionTypes';


const saveDetails = (res) => {
    return {
        type: actionTypes.FETCH_DETAILS,
        details: res
    }
}

export const fetchDetails = (id = 0) => {
    return (dispatch, getState) => {
        // async get proccess
        let url = 'https://api.jsonbin.io/b/5f101620c1edc4661758030a';

        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'secret-key': '$2b$10$IS21t82Y4ZQ6qX6QPAKm6e5gfdSkfZJFLeX9E5XWKLKnXpZinECQC'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(saveDetails(data));
                console.log(data);
            })

    }

}



