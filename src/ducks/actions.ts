import { Thunk } from "../types/types";
import {
    ACCOUNT_INIT,
    USER_LOGIN,
    ACCOUNT_LINK,
    ACCOUNT_UNLINK,
    ACCOUNT_UPDATE,
} from "./consts";
import { initAccountMiddlewareActionCreator } from "../middleware/actions";
import { AccountData } from "../middleware/types";
import { UpdateAccountPayload } from "../utils/updateAccountTypes";

export interface UserLoginPayload {
    email: string;
}

export interface InitAccountAction {
    type: typeof ACCOUNT_INIT;
    payload: AccountData[];
}
export function initAccountAction(payload: AccountData[]): InitAccountAction {
    return {
        type: ACCOUNT_INIT,
        payload,
    };
}
export function initAccountActionCreator(payload: AccountData[]): Thunk {
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
        dispatch(initAccountMiddlewareActionCreator());
    };
}

export interface LinkAccountAction {
    type: typeof ACCOUNT_LINK;
    payload: AccountData;
}
export function linkAccountAction(payload: AccountData): LinkAccountAction {
    return {
        type: ACCOUNT_LINK,
        payload,
    };
}
export function linkAccountActionCreator(payload: AccountData): Thunk {
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

export interface UpdateAccountAction {
    type: typeof ACCOUNT_UPDATE;
    payload: UpdateAccountPayload<AccountData>;
}
export function updateAccountActionCreator(payload: UpdateAccountPayload<AccountData>): UpdateAccountAction {
    return {
        type: ACCOUNT_UPDATE,
        payload,
    };
}
export function updateAccountActionCreatorCreator(payload: UpdateAccountPayload<AccountData>): Thunk {
    return dispatch => {
        dispatch(updateAccountActionCreator(payload));
    };
}
