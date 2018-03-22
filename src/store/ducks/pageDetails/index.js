import axios from "axios";

const LOAD_VIDEO_DETAILS = "LOAD_VIDEO_DETAILS";
const RETURN_TO_VIDEOS = "RETURN_TO_VIDEOS";

const YOUTUBE_COMMENTS_URI =
  "https://www.googleapis.com/youtube/v3/commentThreads";
const YOUTUBE_SEARCH_URI = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_PARAMS = {
  key: process.env.REACT_APP_GOOGLE_API_KEY,
  part: "snippet"
};

const INITIAL_STATE = {
  authorVideos: [],
  comments: [],
  showDetails: false,
  videoPageDetails: "",
  videoId: ""
};

export const loadVideoDetailPage = (
  videoId,
  videoPageDetails
) => async dispatch => {
  const { data: { items: comments } } = await axios.get(YOUTUBE_COMMENTS_URI, {
    params: {
      ...YOUTUBE_PARAMS,
      videoId
    }
  });

  const { data: { items: authorVideos } } = await axios.get(
    YOUTUBE_SEARCH_URI,
    {
      params: {
        ...YOUTUBE_PARAMS,
        channelId: videoPageDetails.channelId,
        maxResults: 10
      }
    }
  );

  dispatch({
    type: LOAD_VIDEO_DETAILS,
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
    case LOAD_VIDEO_DETAILS:
      return {
        ...state,
        ...action.payload,
        showDetails: true
      };
    case RETURN_TO_VIDEOS:
      return { ...state, showDetails: false };
    default:
      return state;
  }
}
