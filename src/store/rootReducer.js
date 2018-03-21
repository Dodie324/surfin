import { combineReducers } from "redux";
import pageDetails from "./ducks/pageDetails";
import surfVideos from "./ducks/videos";

export default combineReducers({
  pageDetails,
  surfVideos
});
