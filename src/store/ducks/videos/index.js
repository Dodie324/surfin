import axios from "axios";

const CLEAR_VIDEOS = "CLEAR_VIDEOS";
const ERROR = "ERROR";
const FETCH_VIDEO_DATA = "FETCH_VIDEO_DATA";
const LOADING_VIDEOS = "LOADING_VIDEOS";

const YOUTUBE_SEARCH_URI = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_PARAMS = {
  key: process.env.REACT_APP_GOOGLE_API_KEY,
  maxResults: 12,
  part: "snippet",
  q: "surfing",
  type: "video"
};

const INITIAL_STATE = {
  isLoading: false,
  nextPageToken: "",
  filter: "order,relevance",
  query: "",
  totalResults: null,
  videos: []
};

export const fetchVideos = (query = "", filter = "order,relevance") => async dispatch => {
  dispatch({ type: CLEAR_VIDEOS });

  const filterArray = filter.split(",");
  const filterKey = filterArray[0];
  const filterValue = filterArray[1];

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
        totalResults: data.pageInfo.totalResults,
        videos: data.items
      }
    });
  } catch({ response }) {
    dispatch({
      type: ERROR,
      payload: { error: response.data.error.message }
    });
  }
};

export const fetchAdditionalVideos = () => async (dispatch, getState) => {
  dispatch({ type: LOADING_VIDEOS });

  const { nextPageToken, filter, query } = getState().surfVideos;
  const filterArray = filter.split(",");
  const filterKey = filterArray[0];
  const filterValue = filterArray[1];

  try {
    const { data } = await axios.get(YOUTUBE_SEARCH_URI, {
      params: {
        ...YOUTUBE_PARAMS,
        [filterKey]: filterValue,
        pageToken: nextPageToken,
        q: (YOUTUBE_PARAMS.q + " " + query).trim()
      }
    });

    dispatch({
      type: FETCH_VIDEO_DATA,
      payload: {
        nextPageToken: data.nextPageToken,
        totalResults: data.pageInfo.totalResults,
        videos: data.items
      }
    });
  } catch({ response }) {
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
      return { ...state, error: action.payload.error }
    case FETCH_VIDEO_DATA:
      const updatedState = {
        ...state,
        isLoading: false,
        nextPageToken: action.payload.nextPageToken,
        totalResults: action.payload.totalResults,
        videos: [...state.videos, ...action.payload.videos]
      }

      if (action.payload.filter) {
        updatedState.filter = action.payload.filter
      }

      if (action.payload.query) {
        updatedState.query = action.payload.query
      }

      return updatedState;
    case LOADING_VIDEOS:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
