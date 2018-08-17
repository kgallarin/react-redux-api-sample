import { combineReducers } from "redux";
import {
  FETCH_FULFILLED,
  FETCH_PENDING,
  FETCH_REJECTED,
  QUERY_IMAGE,
  INDIVIDUAL_IMAGE_STATE
} from "../actions/index";

const searchSettingsDefaultState = {
  text_query: "rainy",
  imageToDOM: true,
  settings: {
    params: {
      per_page: 15,
      currentPage: 2,
      client_id: process.env.REACT_APP_UNSPLASH_KEY
    }
  }
};

const searchQueryReducer = (state = searchSettingsDefaultState, action) => {
  switch (action.type) {
    case INDIVIDUAL_IMAGE_STATE:
      return {
        ...state,
        imageToDOM: action.imageToDOM
      };
    case QUERY_IMAGE:
      return {
        text_query: action.text_query,
        [action.text_query]: dataReducer(state[action.text_query], action),
        ...state
      };
    default:
      return state;
  }
};

const dataDefaultState = {
  isLoading: true,
  dataItems: {
    data: []
  },
  isRejected: false,
  err: ""
};

const dataReducer = (state = dataDefaultState, action) => {
  switch (action.type) {
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
