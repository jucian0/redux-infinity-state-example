import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./states";
import { INITIAL_STATE, UserState } from "./states/user";
import { asyncActionMiddleware } from "redux-infinity-state";

const composeEnhancers = composeWithDevTools({});

export interface AppState {
    users: UserState
}

export const appState: AppState = {
    users: INITIAL_STATE
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
