import axios from "axios";

const LOAD_ADDITIONAL_COMMENTS = "LOAD_ADDITIONAL_COMMENTS";
const LOAD_PAGE_DETAILS = "LOAD_PAGE_DETAILS";
const LOADING_COMMENTS = "LOADING_COMMENTS";
const RETURN_TO_VIDEOS = "RETURN_TO_VIDEOS";

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
  loadAdditionalComments: false,
  showDetails: false,
  nextPageToken: "",
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
          maxResults: 10
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

export const loadVideoDetailPage = (videoId, videoPageDetails) => async (
  dispatch,
  { pageDetails }
) => {
  const comments = await cachedComments(videoId);
  const authorVideos = await cachedAuthorVideos(videoPageDetails.channelId);

  dispatch({
    type: LOAD_PAGE_DETAILS,
    payload: {
      authorVideos,
      comments,
      videoId,
      videoPageDetails
    }
  });
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

  const { comments, videoId } = getState().pageDetails;
  const { etag, nextPageToken } = comments;
  const params = {
    ...YOUTUBE_PARAMS,
    maxResults: 20,
    videoId
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

export const returnToVideoList = () => ({ type: RETURN_TO_VIDEOS });

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_ADDITIONAL_COMMENTS:
      return {
        ...state,
        comments: {
          ...action.payload.data,
          items: [...state.comments.items, ...action.payload.data.items]
        },
        loadAdditionalComments: false
      };
    case LOAD_PAGE_DETAILS:
      return {
        ...state,
        ...action.payload,
        loadingDetails: false,
        showDetails: true
      };
    case LOADING_COMMENTS:
      return { ...state, loadAdditionalComments: action.payload };
    case RETURN_TO_VIDEOS:
      return { ...state, showDetails: false, loadAdditionalComments: false };
    default:
      return state;
  }
}
