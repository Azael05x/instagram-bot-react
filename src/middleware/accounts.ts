import {
    Middleware,
    MiddlewareAPI,
} from "redux";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
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
    UnlinkAccountMiddlewareActionCreator,
} from "./actions";
import { selectUser } from "../ducks/selectors";
import { AccountLinkData } from "./types";

// TODO: Add typings, bitch (ti pro sebja Roland???), da blja
export interface PartialState {
}

export type AccountMiddlewareAction =
    | LinkAccountMiddlewareActionCreator
    | UnlinkAccountMiddlewareActionCreator
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
                    .then((response: AxiosResponse<AccountLinkData[]>) => {
                        dispatch(initAccountActionCreator(response.data as any))
                    })
                    .catch(error => {
                        // TODO: Handle error with message
                        console.log("NO SUCH get", error)
                    });
                break;
            }
            case  ACCOUNT_LINK: {
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
                    .then((response: AxiosResponse<AccountLinkData>) => {
                        dispatch(linkAccountActionCreator(createNewAccount(response.data.username, response.data.id)))
                    })
                    .catch(error => {
                        // TODO: Handle error with message
                        console.log("NO SUCH ACCOUNT", error)
                    });
                break;
            }
            case ACCOUNT_UNLINK: {
                const config: AxiosRequestConfig = {
                    headers: {
                        "Authorization": selectUser(getState()).auth_token,
                    }
                };

                axios.delete(BASE_URL + LINK_ACCOUNT_URL + `/${action.payload}`, config)
                    .then((response) => {
                        dispatch(unlinkAccountActionCreator(action.payload))
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
