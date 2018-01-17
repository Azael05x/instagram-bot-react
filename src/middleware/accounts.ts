import {
    Middleware,
    MiddlewareAPI,
} from "redux";
import axios from "axios";
import {
    linkAccountActionCreator,
    unlinkAccountActionCreator,
    initAccountActionCreator
} from "../ducks/actions";
import {
    ACCOUNT_INIT,
    ACCOUNT_LINK,
    ACCOUNT_UNLINK,
} from "./consts";
import { Thunk } from '../types/types';
import { UserAccount } from "../components/dashboard/components/account/Account";
import { BASE_URL, LINK_ACCOUNT_URL } from "../consts";
import { createNewAccount } from "./utils";
import {
    InitAccountMiddlewareAction,
    LinkAccountMiddlewareActionCreator,
} from "./actions";
import { selectUser } from "../ducks/selectors";

// TODO: Add typings, bitch (ti pro sebja Roland???), da blja
export interface PartialState {
}

export type AccountMiddlewareAction =
    | LinkAccountMiddlewareActionCreator
    | InitAccountMiddlewareAction
;

export const accountMiddleware = (<S extends PartialState>({ dispatch, getState }: MiddlewareAPI<S>) => (next: any) => {
    return (action: AccountMiddlewareAction) => {
        switch (action.type) {
            case ACCOUNT_INIT: {
                const config = {
                    headers: {
                        "Authorization": selectUser(getState()).auth_token,
                    },
                };
                axios.get(BASE_URL + LINK_ACCOUNT_URL, config)
                    .then(response => {
                        dispatch(initAccountActionCreator(response.data as UserAccount[]))
                    })
                    .catch(error => {
                        // TODO: Handle error with message
                        console.log("NO SUCH get", error)
                    });
                break;
            }
            case  ACCOUNT_LINK: {
                // TODO: Remove dummy data after LinkAccount.tsx is finished
                const data = {
                    username: action.payload.username,
                    password: action.payload.password,
                };
                const config = {
                    headers: {
                        "Authorization": selectUser(getState()).auth_token,
                    }
                };

                axios.post(BASE_URL + LINK_ACCOUNT_URL, data, config)
                    .then(response => {
                        dispatch(linkAccountActionCreator(createNewAccount(action.payload.username)))
                    })
                    .catch(error => {
                        // TODO: Handle error with message
                        console.log("NO SUCH ACCOUNT", error)
                    });
                break;
            }
            default:
        }

        return next(action);
    }
}) as Middleware;
