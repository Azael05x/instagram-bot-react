import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { MainConnected } from "./components/main/Main";
import { reducer as commonReducer } from "../src/ducks/common";

const store = createStore(
    commonReducer as any, // TODO: Fix incompatible type
    applyMiddleware(
        thunk,
    ),
);
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
