import { Thunk } from "../types/types";
import {
    ACCOUNT_INIT,
    ACCOUNT_LINK,
    ACCOUNT_UNLINK,
} from "./consts";

export interface AccountLinking  {
    username: string;
    password: string;
}
export interface LinkAccountMiddlewareActionCreator {
    type: typeof ACCOUNT_LINK;
    payload: AccountLinking;
}
export function linkAccountMiddlewareAction(payload: AccountLinking): LinkAccountMiddlewareActionCreator {
    return {
        type: ACCOUNT_LINK,
        payload,
    }
};
export function linkAccountMiddlewareActionCreator(payload: AccountLinking): Thunk {
    return (dispatch) => {
        dispatch(linkAccountMiddlewareAction(payload));
    };
}

export interface InitAccountMiddlewareAction {
    type: typeof ACCOUNT_INIT;
}
export function initAccountMiddlewareAction(): InitAccountMiddlewareAction {
    return {
        type: ACCOUNT_INIT,
    }
};
export function initAccountMiddlewareActionCreator(): Thunk {
    return (dispatch) => {
        dispatch(initAccountMiddlewareAction());
    };
}