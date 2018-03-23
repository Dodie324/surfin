const SAVE_SCROLL_POS = "SAVE_SCROLL_POS";

const INITIAL_STATE = {
  position: 0
};

export const saveScrollPosition = pos => ({
  type: SAVE_SCROLL_POS,
  payload: { pos }
});

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_SCROLL_POS:
      return {
        ...state,
        position: action.payload.pos
      };
    default:
      return state;
  }
}
