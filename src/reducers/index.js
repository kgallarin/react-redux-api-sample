import { combineReducers } from "redux";
import {
  FETCH_FULFILLED,
  FETCH_PENDING,
  FETCH_REJECTED,
  QUERY_IMAGE,
  INDIVIDUAL_IMAGE_STATE,
  NEXT_PAGE,
  PAGINATION_PRESETS,
  RECEIVE_DATA
} from "../actions/index";

const RECEIVE_DATA_PENDING = "RECEIVE_DATA_PENDING";
const RECEIVE_DATA_FULFILLED = "RECEIVE_DATA_FULFILLED";
const RECEIVE_DATA_REJECTED = "RECEIVE_DATA_REJECTED";
// change page handler

// search query reducer contains fetch parameters and query
const searchSettingsDefaultState = {
  text_query: "dark",
  pageRange: 5,
  page: 1,
  imageToDOM: true,
  settings: {
    params: {
      per_page: 12,
      client_id: process.env.REACT_APP_UNSPLASH_KEY
    }
  }
};

const searchQueryReducer = (state = searchSettingsDefaultState, action) => {
  switch (action.type) {
    case QUERY_IMAGE:
      return {
        ...state,
        text_query: action.text_query
      };
    case INDIVIDUAL_IMAGE_STATE:
      return {
        ...state,
        imageToDOM: action.imageToDOM
      };
    default:
      return state;
  }
};
// data reducer contains data fetching payload
const dataDefaultState = {
  isLoading: true,
  imgData: [],
  pageHeaders: {},
  isRejected: false,
  err: ""
};

const promiseReducer = (state = dataDefaultState, action) => {
  switch (action.type) {
    case FETCH_PENDING:
      return dataDefaultState;
    case FETCH_REJECTED:
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case FETCH_FULFILLED:
      return {
        ...state,
        isLoading: false
      };
    case RECEIVE_DATA:
      return {
        ...state,
        isLoading: false,
        imgData: action.imageDataPayload,
        pageHeaders: action.pageHeaders
      };

    default:
      return state;
  }
};

const receiveData = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DATA_PENDING:
    case RECEIVE_DATA_REJECTED:
    case RECEIVE_DATA_FULFILLED:
    case RECEIVE_DATA:
      return {
        ...state,
        [action.query]: promiseReducer(state[action.query], action)
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  promiseReducer,
  searchQueryReducer,
  receiveData
});

export default rootReducer;
