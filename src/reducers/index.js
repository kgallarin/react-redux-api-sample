import { combineReducers } from "redux";
import {
  FETCH_FULFILLED,
  FETCH_PENDING,
  FETCH_REJECTED,
  QUERY_IMAGE,
  INDIVIDUAL_IMAGE_STATE
} from "../actions/index";

const searchSettingsDefaultState = {
  text_query: "kevin",
  imageToDOM: true,
  settings: {
    params: {
      per_page: 2,
      currentPage: 2,
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
