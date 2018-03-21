const LOAD_VIDEO_DETAIL = "LOAD_VIDEO_DETAIL";

const INITIAL_STATE = {
  showDetails: false,
  videoPageDetails: "",
  videoPageId: ""
};

export const loadVideoDetailPage = (videoPageId, videoPageDetails) => ({
  type: LOAD_VIDEO_DETAIL,
  payload: {
    videoPageId,
    videoPageDetails
  }
});

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_VIDEO_DETAIL:
      return {
        ...state,
        showDetails: true,
        videoPageId: action.payload.videoPageId,
        videoPageDetails: action.payload.videoPageDetails
      };
    default:
      return state;
  }
}
