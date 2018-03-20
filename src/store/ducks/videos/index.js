import axios from 'axios';

const FETCH_VIDEO_DATA = 'FETCH_VIDEO_DATA';

const YOUTUBE_URI = 'https://www.googleapis.com/youtube/v3/';
const YOUTUBE_SEARCH_URI = YOUTUBE_URI + 'search';
const YOUTUBE_SEARCH_PARAMS = {
  key: process.env.REACT_APP_GOOGLE_API_KEY,
  maxResults: 15,
  part: 'snippet',
  q: 'surfing',
  type: 'video'
};

const INITIAL_STATE = {
  nextPageToken: '',
  query: '',
  videos: []
};

export const fetchVideos = (query = "") => async dispatch => {
  const q = (YOUTUBE_SEARCH_PARAMS.q + ' ' + query).trim();
  const { data } = await axios.get(YOUTUBE_SEARCH_URI, {
    params: { ...YOUTUBE_SEARCH_PARAMS, q }
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

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_VIDEO_DATA:
      return {
        ...state,
        nextPageToken: action.payload.nextPageToken,
        query: action.payload.query,
        videos: action.payload.videos
      };
    default:
      return state;
  }
}
