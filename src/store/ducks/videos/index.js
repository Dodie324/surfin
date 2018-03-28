import axios from "axios";

import { LOADING } from "../loader";

const CLEAR_VIDEOS = "CLEAR_VIDEOS";
const ERROR = "ERROR";
const FETCH_VIDEO_DATA = "FETCH_VIDEO_DATA";
const LOADING_ADDITIONAL_VIDEOS = "LOADING_ADDITIONAL_VIDEOS";

const YOUTUBE_SEARCH_URI = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_PARAMS = {
  key: process.env.REACT_APP_GOOGLE_API_KEY,
  maxResults: 15,
  part: "snippet",
  q: "surfing",
  type: "video"
};

const INITIAL_STATE = {
  loadAdditional: false,
  nextPageToken: "",
  filter: "order,relevance",
  query: "",
  remainingCount: null,
  totalResults: null,
  videos: []
};

const stripFilter = f => f.split(",");

export const fetchVideos = (
  query = "",
  filter = "order,relevance"
) => async dispatch => {
  dispatch({ type: CLEAR_VIDEOS });
  dispatch({ type: LOADING, payload: true });

  const [filterKey, filterValue] = stripFilter(filter);

  try {
    const { data } = await axios.get(YOUTUBE_SEARCH_URI, {
      params: {
        ...YOUTUBE_PARAMS,
        [filterKey]: filterValue,
        q: (YOUTUBE_PARAMS.q + " " + query).trim()
      }
    });

    dispatch({
      type: FETCH_VIDEO_DATA,
      payload: {
        filter,
        nextPageToken: data.nextPageToken,
        query,
        remainingCount:
          data.pageInfo.totalResults - data.pageInfo.resultsPerPage,
        totalResults: data.pageInfo.totalResults,
        videos: data.items
      }
    });
    dispatch({ type: LOADING, payload: false });
  } catch ({ response }) {
    dispatch({
      type: ERROR,
      payload: { error: response.data.error.message }
    });
  }
};

export const fetchAdditionalVideos = () => async (dispatch, getState) => {
  dispatch({ type: LOADING_ADDITIONAL_VIDEOS });

  const {
    nextPageToken,
    filter,
    query,
    remainingCount
  } = getState().surfVideos;
  const [filterKey, filterValue] = stripFilter(filter);
  const maxResults = remainingCount < 30 ? remainingCount : 30;

  try {
    const { data } = await axios.get(YOUTUBE_SEARCH_URI, {
      params: {
        ...YOUTUBE_PARAMS,
        [filterKey]: filterValue,
        maxResults,
        pageToken: nextPageToken,
        q: (YOUTUBE_PARAMS.q + " " + query).trim()
      }
    });

    dispatch({
      type: FETCH_VIDEO_DATA,
      payload: {
        nextPageToken: data.nextPageToken,
        remainingCount: remainingCount - data.pageInfo.resultsPerPage,
        totalResults: data.pageInfo.totalResults,
        videos: data.items
      }
    });
  } catch ({ response }) {
    dispatch({
      type: ERROR,
      payload: { error: response.data.error.message }
    });
  }
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CLEAR_VIDEOS:
      return { ...state, videos: [] };
    case ERROR:
      return { ...state, error: action.payload.error };
    case FETCH_VIDEO_DATA:
      const updatedState = {
        ...state,
        loadAdditional: false,
        nextPageToken: action.payload.nextPageToken,
        remainingCount: action.payload.remainingCount,
        totalResults: action.payload.totalResults,
        videos: [...state.videos, ...action.payload.videos]
      };

      if (action.payload.filter) {
        updatedState.filter = action.payload.filter;
      }

      if (action.payload.query) {
        updatedState.query = action.payload.query;
      }

      return updatedState;
    case LOADING_ADDITIONAL_VIDEOS:
      return { ...state, loadAdditional: true };
    default:
      return state;
  }
}
