import axios from "axios";

export const FETCH = "FETCH";

export const QUERY_IMAGE = "QUERY_IMAGE";
export const INPUT_TEXT = "INPUT_TEXT";
export const INDIVIDUAL_IMAGE_STATE = "INDIVIDUAL_IMAGE_STATE";

// promise;
export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const FETCH_PENDING = "FETCH_PENDING";
export const FETCH_REJECTED = "FETCH_REJECTED";

export const RECEIVE_DATA = "RECEIVE_DATA";
// page change
export const PAGINATION_PRESETS = "PAGINATION_PRESETS";

// 🎬 FETCH STARTS
export const createQuery = text_query => ({
  type: QUERY_IMAGE,
  text_query
});

export const receiveData = (query, data, thePage) => ({
  type: RECEIVE_DATA,
  imageDataPayload: data.data.map(response => response),
  pageHeaders: data.headers,
  query,
  thePage
});

export const pageHandler = thePage => ({
  type: PAGINATION_PRESETS,
  thePage
});

// cant mutate page here
export const fetchAPI = (query, page) => {
  const url = `https://api.unsplash.com/photos/search/?query=${query}&page=${page}`;
  const settings = {
    params: {
      per_page: 5,
      client_id: process.env.REACT_APP_UNSPLASH_KEY
    }
  };
  return dispatch => {
    return dispatch({
      type: FETCH,
      payload: axios.get(url, settings)
    }).then(({ value, action }) => {
      dispatch(receiveData(query, value, page));
      // console.log(action.type, " :=> action");
    });
  };
};
export const imageHandling = imageToDOM => ({
  type: INDIVIDUAL_IMAGE_STATE,
  imageToDOM
});
