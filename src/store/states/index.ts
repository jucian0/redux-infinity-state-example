import { combineReducers, Reducer } from "redux";

import { reducer } from "./user";

export default combineReducers({
  users: reducer as Reducer
});
