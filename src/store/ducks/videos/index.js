import axios from "axios";

const CLEAR_VIDEOS = "CLEAR_VIDEOS";
const FETCH_VIDEO_DATA = "FETCH_VIDEO_DATA";
const LOADING = "LOADING";

const YOUTUBE_SEARCH_URI = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_SEARCH_PARAMS = {
  key: process.env.REACT_APP_GOOGLE_API_KEY,
  maxResults: 15,
  part: "snippet",
  q: "surfing",
  type: "video"
};

const INITIAL_STATE = {
  isLoading: false,
  nextPageToken: "",
  query: "",
  videos: []
};

export const fetchVideos = (query = "") => async (dispatch, getState) => {
  dispatch({ type: CLEAR_VIDEOS });
  dispatch({ type: LOADING });

  const { data } = await axios.get(YOUTUBE_SEARCH_URI, {
    params: {
      ...YOUTUBE_SEARCH_PARAMS,
      q: (YOUTUBE_SEARCH_PARAMS.q + " " + query).trim()
    }
  });

  dispatch({
    type: FETCH_VIDEO_DATA,
    payload: {
      nextPageToken: data.nextPageToken,
      query,
      videos: data.items
    }
  });
};

export const fetchAdditionalVideos = () => async (dispatch, getState) => {
  dispatch({ type: LOADING });

  const { nextPageToken, query } = getState().surfVideos;
  const { data } = await axios.get(YOUTUBE_SEARCH_URI, {
    params: {
      ...YOUTUBE_SEARCH_PARAMS,
      pageToken: nextPageToken,
      q: YOUTUBE_SEARCH_PARAMS.q + " " + query
    }
  });

  dispatch({
    type: FETCH_VIDEO_DATA,
    payload: {
      nextPageToken: data.nextPageToken,
      videos: data.items
    }
  });
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CLEAR_VIDEOS:
      return { ...state, videos: [] };
    case FETCH_VIDEO_DATA:
      return {
        ...state,
        isLoading: false,
        nextPageToken: action.payload.nextPageToken,
        query: action.payload.query || state.query,
        videos: [...state.videos, ...action.payload.videos]
      };
    case LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
