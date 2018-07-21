import { Thunk } from "../types/types";
import {
    ACCOUNT_INIT,
    USER_LOGIN,
    ACCOUNT_LINK,
    ACCOUNT_UNLINK,
    ACCOUNT_UPDATE,
    OPEN_POPUP,
    CLOSE_POPUP,
} from "./consts";
import { initAccountMiddlewareAction } from "../middleware/actions";
import { AccountData } from "../middleware/types";
import { UpdateAccountPayload } from "../types/updateAccountTypes";

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
        dispatch(initAccountMiddlewareAction());
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

export interface UpdateAccountAction {
    type: typeof ACCOUNT_UPDATE;
    payload: UpdateAccountPayload<AccountData>;
}
export function updateAccountAction(payload: UpdateAccountPayload<AccountData>): UpdateAccountAction {
    return {
        type: ACCOUNT_UPDATE,
        payload,
    };
}

// Popups
export interface OpenPopupAction {
    type: typeof OPEN_POPUP;
    payload: any;
}
export function openPopupAction(payload: any): OpenPopupAction {
    return {
        type: OPEN_POPUP,
        payload,
    };
}

export interface ClosePopupAction {
    type: typeof CLOSE_POPUP;
}
export function closePopupAction(): ClosePopupAction {
    return {
        type: CLOSE_POPUP,
    };
}
export function closePopupActionCreator(): Thunk {
    return dispatch => {
        dispatch(closePopupAction());
    };
}
