export const LOADING = "LOADING";
export const LOADING_PAGE_DETAIL = "LOADING_PAGE_DETAIL";

const INITIAL_STATE = {
  loading: false,
  loadPageDetails: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case LOADING_PAGE_DETAIL:
      return { ...state, loadPageDetails: action.payload };
    default:
      return state;
  }
}
