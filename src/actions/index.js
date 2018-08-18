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

export const fetchAPI = (query, settings) => {
  const url = `https://api.unsplash.com/photos/search/?query=${query}`;
  return {
    type: FETCH,
    payload: axios.get(url, settings)
  };
};

export const imageHandling = imageToDOM => ({
  type: INDIVIDUAL_IMAGE_STATE,
  imageToDOM
});
