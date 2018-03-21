const LOAD_VIDEO_DETAILS = "LOAD_VIDEO_DETAILS";
const RETURN_TO_VIDEOS = "RETURN_TO_VIDEOS";

const INITIAL_STATE = {
  showDetails: false,
  videoPageDetails: "",
  videoPageId: ""
};

export const loadVideoDetailPage = (videoPageId, videoPageDetails) => ({
  type: LOAD_VIDEO_DETAILS,
  payload: {
    videoPageId,
    videoPageDetails
  }
});

export const returnToVideoList = () => ({
  type: RETURN_TO_VIDEOS
});

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_VIDEO_DETAILS:
      return {
        ...state,
        showDetails: true,
        videoPageId: action.payload.videoPageId,
        videoPageDetails: action.payload.videoPageDetails
      };
    case RETURN_TO_VIDEOS:
      return { ...state, showDetails: false };
    default:
      return state;
  }
}
