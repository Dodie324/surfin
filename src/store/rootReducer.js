import { combineReducers } from "redux";
import loader from "./ducks/loader";
import pageDetails from "./ducks/pageDetails";
import scrollEvent from "./ducks/scrollEvent";
import surfVideos from "./ducks/videos";

export default combineReducers({
  loader,
  pageDetails,
  scrollEvent,
  surfVideos
});
