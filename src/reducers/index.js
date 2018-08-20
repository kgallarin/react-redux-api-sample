import { combineReducers } from "redux";
import {
  FETCH_FULFILLED,
  FETCH_PENDING,
  FETCH_REJECTED,
  QUERY_IMAGE,
  INDIVIDUAL_IMAGE_STATE
  // NEXT_PAGE
} from "../actions/index";

// change page handler

// search query reducer contains fetch parameters and query
const searchSettingsDefaultState = {
  text_query: "dark",
  pageRange: 5,
  imageToDOM: true,
  settings: {
    params: {
      per_page: 12,
      page: 1,
      client_id: process.env.REACT_APP_UNSPLASH_KEY
    }
  }
};

const searchQueryReducer = (state = searchSettingsDefaultState, action) => {
  switch (action.type) {
    // case NEXT_PAGE:
    //   return { ...state, page: action.page };
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
  dataItems: {},
  isRejected: false,
  err: ""
};

const dataReducer = (state = dataDefaultState, action) => {
  switch (action.type) {
    case QUERY_IMAGE:
    case FETCH_PENDING:
      return dataDefaultState;
    case FETCH_FULFILLED:
      return {
        ...state,
        isLoading: false,
        dataItems: action.payload
      };
    case FETCH_REJECTED:
      return {
        ...state,
        isLoading: false,
        isRejected: true,
        err: action.payload
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  dataReducer,
  searchQueryReducer
});

export default rootReducer;
