import { combineReducers } from "redux";
import pageDetails from "./ducks/pageDetails";
import scrollEvent from "./ducks/scrollEvent";
import surfVideos from "./ducks/videos";

export default combineReducers({
  pageDetails,
  scrollEvent,
  surfVideos
});
