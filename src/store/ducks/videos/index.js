import axios from "axios";

import { LOADING, LOADING_PAGE_DETAIL } from "../loader";

const CLEAR_VIDEOS = "CLEAR_VIDEOS";
const ERROR = "ERROR";
const LOAD_VIDEO_LIST = "LOAD_VIDEO_LIST";
const LOAD_ADDITIONAL_VIDEOS = "LOADING_ADDITIONAL_VIDEOS";

const MAX_RESULTS = 32;

const YOUTUBE_SEARCH_URI = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_PARAMS = {
  key: process.env.REACT_APP_GOOGLE_API_KEY,
  maxResults: MAX_RESULTS,
  part: "snippet",
  q: "surfing",
  type: "video"
};

const INITIAL_STATE = {
  loadAdditional: false,
  filter: "order,relevance",
  query: "",
  videoData: {}
};

const stripFilter = f => f.split(",");

const renderedSet = () => {
  let set = new Set();
  return (etag, reset = false) => {
    if (reset) set = new Set();

    if (set.has(etag)) {
      return true;
    } else {
      set.add(etag);
      return false;
    }
  };
};

const hasRendered = renderedSet();

export const fetchVideos = (
  query = "",
  filter = "order,relevance"
) => async dispatch => {
  dispatch({ type: CLEAR_VIDEOS });
  dispatch({ type: LOADING, payload: true });
  dispatch({ type: LOADING_PAGE_DETAIL, payload: false });

  const [filterKey, filterValue] = stripFilter(filter);

  try {
    const { data } = await axios.get(YOUTUBE_SEARCH_URI, {
      params: {
        ...YOUTUBE_PARAMS,
        [filterKey]: filterValue,
        q: (YOUTUBE_PARAMS.q + " " + query).trim()
      }
    });

    const sanitizedData = data.items.filter(i => !hasRendered(i.etag, true));

    dispatch({
      type: LOAD_VIDEO_LIST,
      payload: {
        filter,
        query,
        videoData: {
          ...data,
          items: sanitizedData,
          remainingCount:
            data.pageInfo.totalResults - data.pageInfo.resultsPerPage
        }
      }
    });
    dispatch({ type: LOADING, payload: false });
  } catch ({ response }) {
    dispatch({
      type: ERROR,
      payload: { error: response.data.error.message }
    });
    dispatch({ type: CLEAR_VIDEOS });
  }
};

export const fetchAdditionalVideos = () => async (dispatch, getState) => {
  const {
    filter,
    query,
    videoData: { nextPageToken, remainingCount }
  } = getState().surfVideos;
  const [filterKey, filterValue] = stripFilter(filter);
  const maxResults =
    remainingCount < MAX_RESULTS ? remainingCount : MAX_RESULTS;

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

    if (!data.items.length) return;

    const sanitizedData = data.items.filter(i => !hasRendered(i.etag));

    dispatch({
      type: LOAD_ADDITIONAL_VIDEOS,
      payload: {
        videoData: {
          ...data,
          items: sanitizedData,
          remainingCount: remainingCount - data.pageInfo.resultsPerPage
        }
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
      return INITIAL_STATE;
    case ERROR:
      return { ...state, error: action.payload.error };
    case LOAD_VIDEO_LIST:
      return {
        ...state,
        ...action.payload
      };
    case LOAD_ADDITIONAL_VIDEOS:
      return {
        ...state,
        loadAdditional: false,
        videoData: {
          ...action.payload.videoData,
          items: [...state.videoData.items, ...action.payload.videoData.items]
        }
      };
    default:
      return state;
  }
}
