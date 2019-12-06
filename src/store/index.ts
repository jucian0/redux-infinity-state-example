import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./todos";
import { Todo } from "./todos/reducer";
import { asyncActionMiddleware } from "redux-infinity-state";

const composeEnhancers = composeWithDevTools({});

export interface AppState{
    todos: Array<Todo>
}

const appState: AppState = {
    todos:[]
}


const store = createStore(
    reducers, 
    appState,
    composeEnhancers(
        applyMiddleware(
            asyncActionMiddleware
        )
));

export default store;
