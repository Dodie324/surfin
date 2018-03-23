import axios from "axios";

const CLEAR_VIDEOS = "CLEAR_VIDEOS";
const FETCH_VIDEO_DATA = "FETCH_VIDEO_DATA";
const LOADING = "LOADING";

const YOUTUBE_SEARCH_URI = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_PARAMS = {
  key: process.env.REACT_APP_GOOGLE_API_KEY,
  maxResults: 15,
  part: "snippet",
  q: "surfing",
  type: "video"
};

const INITIAL_STATE = {
  isLoading: false,
  nextPageToken: "",
  filter: "order,relevance",
  query: "",
  videos: []
};

export const fetchVideos = (query = "", filter = "order,relevance") => async dispatch => {
  dispatch({ type: CLEAR_VIDEOS });
  dispatch({ type: LOADING });

  const filterArray = filter.split(",");
  const filterKey = filterArray[0];
  const filterValue = filterArray[1];

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
      videos: data.items
    }
  });
};

export const fetchAdditionalVideos = () => async (dispatch, getState) => {
  dispatch({ type: LOADING });

  const { nextPageToken, filter, query } = getState().surfVideos;
  const filterArray = filter.split(",");
  const filterKey = filterArray[0];
  const filterValue = filterArray[1];

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
      videos: data.items
    }
  });
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CLEAR_VIDEOS:
      return { ...state, videos: [] };
    case FETCH_VIDEO_DATA:
      const updatedState = {
        ...state,
        isLoading: false,
        nextPageToken: action.payload.nextPageToken,
        videos: [...state.videos, ...action.payload.videos]
      }

      if (action.payload.filter) {
        updatedState.filter = action.payload.filter
      }

      if (action.payload.query) {
        updatedState.query = action.payload.query
      }

      return updatedState;
    case LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
