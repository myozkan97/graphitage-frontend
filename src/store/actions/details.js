import * as actionTypes from "./actionTypes";
import httpReq from "./utils/http";

const saveDetails = (res) => {
  return {
    type: actionTypes.FETCH_DETAILS,
    details: res,
  };
};

export const fetchDetails = (id = 0) => {
  return (dispatch, getState) => {
    httpReq("papers/" + id, "GET").then((result) => {
      dispatch(saveDetails(result.data));
    });
  };
};
