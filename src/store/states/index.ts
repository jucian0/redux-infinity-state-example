import { combineReducers, Reducer } from "redux";

import { reducer } from "./todos";

export default combineReducers({
  todos: reducer as Reducer
});
