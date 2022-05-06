import { combineReducers } from "redux";
import addlist from "./addlist.reducer";
const rootReducer = combineReducers({
  addList:addlist,
});

export default rootReducer;
