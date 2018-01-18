import { Thunk } from "../types/types";
import {
    ACCOUNT_INIT,
    USER_LOGIN,
    ACCOUNT_LINK,
    ACCOUNT_UNLINK,
} from "./consts";
import { UserAccount } from "../components/dashboard/components/account/Account";
import { initAccountMiddlewareActionCreator } from "../middleware/actions";
import { AccountLinkData } from "../middleware/types";

export interface UserLoginPayload {
    email: string;
}

export interface InitAccountAction {
    type: typeof ACCOUNT_INIT;
    payload: AccountLinkData[];
}
export function initAccountAction(payload: AccountLinkData[]): InitAccountAction {
    return {
        type: ACCOUNT_INIT,
        payload,
    };
}
export function initAccountActionCreator(payload: AccountLinkData[]): Thunk {
    return dispatch => {
        dispatch(initAccountAction(payload));
    };
}

export interface UserLoginPayload {
    email: string;
}

export interface LoginAction {
    type: typeof USER_LOGIN;
    payload: UserLoginPayload;
}
export function loginAction(payload: UserLoginPayload): LoginAction {
    return {
        type: USER_LOGIN,
        payload,
    };
}
export function loginActionCreator(payload: UserLoginPayload): Thunk {
    return dispatch => {
        dispatch(loginAction(payload));
        dispatch(initAccountMiddlewareActionCreator())
    };
}

export interface LinkAccountAction {
    type: typeof ACCOUNT_LINK;
    payload: UserAccount;
}
export function linkAccountAction(payload: UserAccount): LinkAccountAction {
    return {
        type: ACCOUNT_LINK,
        payload,
    };
}
export function linkAccountActionCreator(payload: UserAccount): Thunk {
    return dispatch => {
        dispatch(linkAccountAction(payload));
    };
}

export interface UnlinkAccountAction {
    type: typeof ACCOUNT_UNLINK;
    payload: number;
}
export function unlinkAccountAction(payload: number): UnlinkAccountAction {
    return {
        type: ACCOUNT_UNLINK,
        payload,
    };
}
export function unlinkAccountActionCreator(payload: number): Thunk {
    return dispatch => {
        dispatch(unlinkAccountAction(payload));
    };
}
