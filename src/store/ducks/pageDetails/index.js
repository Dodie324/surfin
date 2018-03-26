import axios from "axios";

const RENDER_PAGE_DETAILS = "RENDER_PAGE_DETAILS";
const RETURN_TO_VIDEOS = "RETURN_TO_VIDEOS";

const YOUTUBE_PARAMS = {
  key: process.env.REACT_APP_GOOGLE_API_KEY,
  part: "snippet"
};

const apiURI = {
  comments: "https://www.googleapis.com/youtube/v3/commentThreads",
  videos: "https://www.googleapis.com/youtube/v3/search"
}

const INITIAL_STATE = {
  authorVideos: [],
  comments: [],
  showDetails: false,
  videoPageDetails: null,
  videoId: null,
};

function timeElapsed(startTime) {
  const endTime = new Date();
  const timeDiff = (endTime - startTime) / 1000;
  return Math.round(timeDiff);
}

const memoizedData = (field) => {
  let loadedAt = new Date();
  let cache = {};
  return async (id) => {
    const timeDiff = timeElapsed(loadedAt);

    // return cache if pressent and the request is made in less than a minute
    if (id in cache && timeDiff < 60) {
      return cache[id];
    } else {
      loadedAt = new Date();

      let params = {};
      if (field === 'comments') {
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

      let items;
      try {
        const { data } = await axios.get(apiURI[field], { params });
        items = data.items || [];
      } catch(_) {
        items = [];
      }

      cache[id] = items;
      return items;
    }
  }
}

const cachedComments = memoizedData("comments");
const cachedAuthorVideos = memoizedData("videos");

export const loadVideoDetailPage = (
  videoId,
  videoPageDetails
) => async (dispatch, { pageDetails }) => {
  const comments = await cachedComments(videoId);
  const authorVideos = await cachedAuthorVideos(videoPageDetails.channelId);

  dispatch({
    type: RENDER_PAGE_DETAILS,
    payload: {
      authorVideos,
      comments,
      videoId,
      videoPageDetails
    }
  });
};

export const returnToVideoList = () => ({ type: RETURN_TO_VIDEOS });

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RENDER_PAGE_DETAILS:
      return {
        ...state,
        ...action.payload,
        loadingDetails: false,
        showDetails: true
      };
    case RETURN_TO_VIDEOS:
      return { ...state, showDetails: false };
    default:
      return state;
  }
}
