import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, Store } from "react-redux";
import { HashRouter } from "react-router-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { ApolloProvider } from "react-apollo";
import {
    HttpLink,
    InMemoryCache,
    ApolloClient,
} from "apollo-boost";

import { reducer as commonReducer } from "@ducks/common";
import { selectUser } from "@ducks/selectors";
import { accountMiddleware } from "@middleware/accounts";
import { initAccountMiddlewareAction } from "@middleware/actions";
import { InstaState } from "@types";
import { GRAPHQL_URL } from "@consts";

import { Main } from "./components/main/Main";
import { toastReducer } from "./components/toast/ducks/reducer";
import { setupInterceptors } from "./components/require-auth/networkService";

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

/**
 * Setup axios interceptors for network request handling
 */
setupInterceptors(store.dispatch);

// Get UserAccount listings
if (selectUser(store.getState()).email) {
    store.dispatch(initAccountMiddlewareAction());
}

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URL }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
    (
        <Provider store={store}>
            <HashRouter>
                <ApolloProvider client={client}>
                    <Main />
                </ApolloProvider>
            </HashRouter>
        </Provider>
    ),
    document.getElementById("app"),
);
