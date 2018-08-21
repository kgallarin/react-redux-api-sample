import axios from "axios";

export const FETCH = "FETCH";

export const QUERY_IMAGE = "QUERY_IMAGE";
export const INPUT_TEXT = "INPUT_TEXT";
export const INDIVIDUAL_IMAGE_STATE = "INDIVIDUAL_IMAGE_STATE";

export const DATA_PROCESSOR = "DATA_PROCESSOR";

// promise;
export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const FETCH_PENDING = "FETCH_PENDING";
export const FETCH_REJECTED = "FETCH_REJECTED";

export const RECEIVE_DATA = "RECEIVE_DATA";
// page change
// export const NEXT_PAGE = "NEXT_PAGE";
export const PAGINATION_PRESETS = "PAGINATION_PRESETS";

// 🎬 FETCH STARTS
export const searchQuery = (
  text_query = "",
  imageToDOM = Boolean,
  per_page = 0,
  currentPage = 0,
  client_id = ""
) => ({
  type: QUERY_IMAGE,
  text_query,
  per_page,
  currentPage,
  client_id,
  imageToDOM
});

export const receiveData = (query, data) => ({
  type: RECEIVE_DATA,
  imageDataPayload: data.data.map(response => response),
  pageHeaders: data.headers,
  query
});

export const fetchAPI = (query, settings) => {
  const url = `https://api.unsplash.com/photos/search/?query=${query}`;
  return dispatch => {
    return dispatch({
      type: FETCH,
      payload: axios.get(url, settings)
    }).then(({ value, action }) => {
      dispatch(receiveData(query, value));
      // console.log(action.type, " :=> action");
    });
  };
};

export const imageHandling = imageToDOM => ({
  type: INDIVIDUAL_IMAGE_STATE,
  imageToDOM
});

// - - - - - - - - - - - - - - - - - - - - PAGE ACTION HANDLERS  - - - - - - - - - - - - - - - - - - - - //
export const paginationPresets = state => ({
  type: PAGINATION_PRESETS,
  state
});
export const pagination = () => (dispatch, getState) => {
  return dispatch(paginationPresets(getState()));
};
export const rangeStart = () => state => {
  const { pageParams, pageRange } = state.searchQueryReducer;
  const start = pageParams.page - pageRange;
  return start > 0 ? start : 1;
};
// export const rangeEnd = () => {
//   const { pageParams, pageRange } = this.props;
//   const pageEnd = pageParams.page + pageRange;

//   const totalPages = this.totalPages();

//   return pageEnd < totalPages ? pageEnd : totalPages;
// };
// export const totalPages = () => {
//   const { pageHeaders } = this.props;

//   return Math.ceil(pageHeaders["x-total"] / pageHeaders["x-per-page"]);
// };
// export const nextPage = () => {
//   const { paginationData } = this.props;
//   return paginationData.params.page + 1;
// };
// export const previousPage = () => {
//   const { paginationData } = this.props;
//   return paginationData.params.page - 1;
// };
// // NAVIGATION STARTS
// export const hasFirstPage = () => {
//   return this.rangeStart !== 1;
// };
// export const hasLastPage = () => {
//   return this.rangeEnd() < this.totalPages();
// };
// export const hasPrevious = () => {
//   const { paginationData } = this.props;
//   return paginationData.params.page > 1;
// };
// export const hasNext = () => {
//   const { paginationData } = this.props;
//   return paginationData.params.page < this.totalPages();
// };
// export const pages = () => {
//   let pages = [];
//   for (let start = this.rangeStart(); start <= this.rangeEnd(); start++) {
//     pages.push[start];
//   }
//   return pages;
// };

// const rangeStart = () => (dispatch, getState) => {
//   // const { paginationData, pageRange } = this.props;
//   // const start = paginationData.params.page - pageRange;
//   return start > 0 ? start : 1;
// };
