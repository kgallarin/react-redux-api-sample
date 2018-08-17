import axios from "axios";

export const FETCH = "FETCH";

export const QUERY_IMAGE = "QUERY_IMAGE";

// promise;
export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const FETCH_PENDING = "FETCH_PENDING";
export const FETCH_REJECTED = "FETCH_REJECTED";

export const searchQuery = (
  text_query,
  per_page = 0,
  currentPage = 0,
  client_id = ""
) => ({
  type: QUERY_IMAGE,
  text_query,
  per_page,
  currentPage,
  client_id
});

export const fetchAPI = (query, settings) => {
  const url = `https://api.unsplash.com/photos/search/?query=${query}`;
  return {
    type: FETCH,
    payload: axios.get(url, settings)
  };
};
