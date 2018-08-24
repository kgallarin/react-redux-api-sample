import { combineReducers } from "redux";
import {
  FETCH_FULFILLED,
  FETCH_PENDING,
  FETCH_REJECTED,
  QUERY_IMAGE,
  INDIVIDUAL_IMAGE_STATE,
  RECEIVE_DATA
} from "../actions/index";

const RECEIVE_DATA_PENDING = "RECEIVE_DATA_PENDING";
const RECEIVE_DATA_FULFILLED = "RECEIVE_DATA_FULFILLED";
const RECEIVE_DATA_REJECTED = "RECEIVE_DATA_REJECTED";

// - - - Search query  - - > action = createQuery = text_query => ({...});
const searchQuery = (state = "phone", action) => {
  switch (action.type) {
    case QUERY_IMAGE:
      return action.text_query;
    default:
      return state;
  }
};

// - - Promise Reducer contains data fetching payload - - action = fetchAPI = (query, page) => {...};
const dataDefaultState = {
  isLoading: true,
  imgData: [],
  pageHeaders: {},
  pageRange: 5,
  isRejected: false,
  imageToDOM: true,
  err: "",
  thePage: 1
};
const promiseReducer = (state = dataDefaultState, action) => {
  switch (action.type) {
    case FETCH_PENDING:
      return dataDefaultState;
    case FETCH_REJECTED:
      return {
        ...state,
        isLoading: false,
        isRejected: true,
        imageToDOM: true,
        err: action.err
      };
    case FETCH_FULFILLED:
      return {
        ...state,
        isLoading: false,
        imageToDOM: true
      };
    case RECEIVE_DATA:
      return {
        ...state,
        isLoading: false,
        imgData: [...state.imgData, ...action.imageDataPayload],
        pageHeaders: action.pageHeaders,
        thePage: action.thePage
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

// - - - Receive Data Reducer - - > action = receiveData = (query, data, thePage) => ({...});
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
  searchQuery,
  receiveData
});

export default rootReducer;
