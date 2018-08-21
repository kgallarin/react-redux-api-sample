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

export const receiveData = (query, data) => ({
  type: RECEIVE_DATA,
  imageDataPayload: data.data.map(response => response),
  pageHeaders: data.headers,
  query
});

export const pageHandler = page => ({
  type: PAGINATION_PRESETS,
  page
});
export const fetchAPI = (query, page) => {
  const url = `https://api.unsplash.com/photos/search/?query=${query}`;
  const settings = {
    params: {
      per_page: 2,
      page: page,
      client_id: process.env.REACT_APP_UNSPLASH_KEY
    }
  };
  return dispatch => {
    return dispatch({
      type: FETCH,
      payload: axios.get(url, settings)
    }).then(({ value, action }) => {
      dispatch(receiveData(query, value));
      dispatch(pageHandler(page));
      // console.log(action.type, " :=> action");
    });
  };
};

export const imageHandling = imageToDOM => ({
  type: INDIVIDUAL_IMAGE_STATE,
  imageToDOM
});

// - - - - - - - - - - - - - - - - - - - - PAGE ACTION HANDLERS  - - - - - - - - - - - - - - - - - - - - //
// export const paginationPresets = state => ({
//   type: PAGINATION_PRESETS,
//   state
// });
// export const pagination = () => (dispatch, getState) => {
//   return dispatch(paginationPresets(getState()));
// };
