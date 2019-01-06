import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import {
    applyMiddleware,
    combineReducers,
    createStore,
    ReducersMapObject,
    Store,
    compose,
} from "redux";
import thunk from "redux-thunk";

import { reducer as commonReducer } from "@ducks/common";
import { selectUser } from "@ducks/selectors";
import { accountMiddleware } from "@middleware/accounts";
import { initAccountMiddlewareAction } from "@middleware/actions";
import { InstaState } from "@types";

import { RootRouter } from "./components/root-router/RootRouter";
import { toastReducer } from "./components/toast/ducks/reducer";
import { setupInterceptors } from "./components/require-auth/networkService";

const reducersMapObject: ReducersMapObject<InstaState> = {
    common: commonReducer,
    toast: toastReducer,
};

const reducers = combineReducers<InstaState>(reducersMapObject);

const store: Store<InstaState> = createStore(
    reducers,
    compose(
        applyMiddleware(
            thunk,
            accountMiddleware,
        ),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    )
);

/**
 * Setup axios interceptors for network request handling
 */
setupInterceptors(store.dispatch);

// Get UserAccount listings
if (selectUser(store.getState()).email) {
    store.dispatch(initAccountMiddlewareAction());
}

ReactDOM.render(
    (
        <Provider store={store}>
            <HashRouter>
                <RootRouter />
            </HashRouter>
        </Provider>
    ),
    document.getElementById("app"),
);
