export const LOADING = "LOADING";

const INITIAL_STATE = {
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
