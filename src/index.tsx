import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, Store } from "react-redux";
import { HashRouter } from "react-router-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { reducer as commonReducer } from "../src/ducks/common";
import { selectUser } from "../src/ducks/selectors";
import { MainConnected } from "./components/main/Main";
import { toastReducer } from "./components/toast/ducks/reducer";
import { accountMiddleware } from "./middleware/accounts";
import { initAccountMiddlewareActionCreator } from "./middleware/actions";
import { InstaState } from "./types/rootState";

const reducers = combineReducers<InstaState>({
    common: commonReducer,
    toast: toastReducer,
});

const store: Store<InstaState> = createStore(
    reducers,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunk,
        accountMiddleware,
    ),
);

// Get UserAccount listings
if (selectUser(store.getState()).email) {
    store.dispatch(initAccountMiddlewareActionCreator());
}

ReactDOM.render(
    (
        <Provider store={store}>
            <HashRouter>
                <MainConnected />
            </HashRouter>
        </Provider>
    ),
    document.getElementById("app"),
);
