import axios from "axios";

import { LOADING, LOADING_PAGE_DETAIL } from "../loader";

const LOAD_ADDITIONAL_COMMENTS = "LOAD_ADDITIONAL_COMMENTS";
const LOAD_PAGE_DETAILS = "LOAD_PAGE_DETAILS";
const LOADING_COMMENTS = "LOADING_COMMENTS";

const YOUTUBE_PARAMS = {
  key: process.env.REACT_APP_GOOGLE_API_KEY,
  part: "snippet"
};

const apiURI = {
  comments: "https://www.googleapis.com/youtube/v3/commentThreads",
  videos: "https://www.googleapis.com/youtube/v3/search"
};

const INITIAL_STATE = {
  authorVideos: {},
  comments: {},
  loadAdditional: false,
  nextPageToken: ""
};

function timeElapsed(startTime) {
  const endTime = new Date();
  const timeDiff = (endTime - startTime) / 1000;
  return Math.round(timeDiff);
}

const memoizedData = field => {
  let loadedAt = new Date();
  let cache = {};
  return async id => {
    const timeDiff = timeElapsed(loadedAt);

    // return cache if pressent and the request is made in less than a minute
    if (id in cache && timeDiff < 60) {
      return cache[id];
    } else {
      loadedAt = new Date();

      let params = {};
      if (field === "comments") {
        params = {
          ...YOUTUBE_PARAMS,
          videoId: id
        };
      } else {
        params = {
          ...YOUTUBE_PARAMS,
          channelId: id,
          maxResults: 12
        };
      }

      let res;
      try {
        const { data } = await axios.get(apiURI[field], { params });
        res = data || [];
      } catch (_) {
        res = null;
      }

      cache[id] = res;
      return res;
    }
  };
};

const cachedComments = memoizedData("comments");
const cachedAuthorVideos = memoizedData("videos");

export const loadVideoDetailPage = videoData => async dispatch => {
  dispatch({ type: LOADING, payload: true });
  dispatch({ type: LOADING_PAGE_DETAIL, payload: true });

  const comments = await cachedComments(videoData.id.videoId);
  const authorVideos = await cachedAuthorVideos(videoData.snippet.channelId);

  dispatch({
    type: LOAD_PAGE_DETAILS,
    payload: {
      authorVideos,
      comments,
      videoData
    }
  });
  dispatch({ type: LOADING, payload: false });
};

const memoizedTokens = () => {
  let initEtag = "";
  let cachedTokens = {};
  return (newEtag, token) => {
    // clear cachedTokens when returning to existing video details page
    if (newEtag === initEtag) cachedTokens = {};
    if (initEtag === "") initEtag = newEtag;

    if (token in cachedTokens) {
      return undefined;
    } else {
      cachedTokens[token] = true;
      return token;
    }
  };
};

const cachedTokens = memoizedTokens();

export const fetchAdditionalComments = () => async (dispatch, getState) => {
  dispatch({ type: LOADING_COMMENTS, payload: true });

  const { comments, videoData } = getState().pageDetails;
  const { etag, nextPageToken } = comments;
  const params = {
    ...YOUTUBE_PARAMS,
    maxResults: 20,
    videoId: videoData.id.videoId
  };
  const token = cachedTokens(etag, nextPageToken);

  // prevent duplicate comments from rendering
  if (token) {
    params.pageToken = token;
  } else {
    dispatch({ type: LOADING_COMMENTS, payload: false });
    return;
  }

  const { data } = await axios.get(apiURI["comments"], { params });

  dispatch({
    type: LOAD_ADDITIONAL_COMMENTS,
    payload: { data }
  });
};

export const returnToVideoList = () => ({
  type: LOADING_PAGE_DETAIL,
  payload: false
});

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_ADDITIONAL_COMMENTS:
      return {
        ...state,
        comments: {
          ...action.payload.data,
          items: [...state.comments.items, ...action.payload.data.items]
        },
        loadAdditional: false
      };
    case LOAD_PAGE_DETAILS:
      return {
        ...state,
        ...action.payload,
        loadingDetails: false
      };
    case LOADING_COMMENTS:
      return { ...state, loadAdditional: action.payload };
    default:
      return state;
  }
}
