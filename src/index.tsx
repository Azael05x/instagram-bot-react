import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { MainConnected } from "./components/main/Main";
import { reducer as commonReducer } from "../src/ducks/common";
import { selectUser } from "../src/ducks/selectors";
import { accountMiddleware } from "./middleware/accounts";
import { initAccountMiddlewareActionCreator } from "./middleware/actions";

const store = createStore(
    commonReducer as any, // TODO: Fix incompatible type
    applyMiddleware(
        thunk,
        accountMiddleware,
    ),
);

// Get UserAccount settings
if (selectUser(store.getState()).auth_token) {
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
