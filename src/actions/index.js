import axios from "axios";

export const QUERY_IMAGE = "QUERY_IMAGE";
// promise;
export const FETCH = "FETCH";
export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const FETCH_PENDING = "FETCH_PENDING";
export const FETCH_REJECTED = "FETCH_REJECTED";
export const RECEIVE_DATA = "RECEIVE_DATA";

// image if fully injected
export const INDIVIDUAL_IMAGE_STATE = "INDIVIDUAL_IMAGE_STATE";

// 🎬 FETCH STARTS
// reducer = searchQuery = (state = "dark", action) => {...};
export const createQuery = text_query => ({
  type: QUERY_IMAGE,
  text_query
});

// reducer = promiseReducer = (state = dataDefaultState, action) => {...};
export const fetchAPI = (query, page) => {
  const url = `https://api.unsplash.com/photos/search/?query=${query}&page=${page}`;
  const settings = {
    params: {
      per_page: 6,
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
// reducer = promiseReducer = (state = dataDefaultState, action) => {...};
export const imageHandling = imageToDOM => ({
  type: INDIVIDUAL_IMAGE_STATE,
  imageToDOM
});

// reducer = receiveData = (state = {}, action) => {...};
export const receiveData = (query, data, thePage) => ({
  type: RECEIVE_DATA,
  imageDataPayload: data.data.map(response => response),
  pageHeaders: data.headers,
  query,
  thePage
});
