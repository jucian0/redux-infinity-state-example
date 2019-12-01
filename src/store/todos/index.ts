import { combineReducers, Reducer } from "redux";

import {reducer} from "./reducer";

export default combineReducers({
  todos: reducer as Reducer
});
