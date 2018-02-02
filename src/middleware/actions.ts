import { Thunk } from "../types/types";
import {
    ACCOUNT_INIT,
    ACCOUNT_LINK,
    ACCOUNT_UNLINK,
    ACCOUNT_UPDATE_ACTIVITIES,
    ACCOUNT_UPDATE_GENERAL,
} from "./consts";
import { AccountData, Activities, General } from "./types";

export interface LinkAccountMiddlewareAction {
    type: typeof ACCOUNT_LINK;
    payload: AccountData;
}
export function linkAccountMiddlewareAction(payload: AccountData): LinkAccountMiddlewareAction {
    return {
        type: ACCOUNT_LINK,
        payload,
    }
};
export function linkAccountMiddlewareActionCreator(payload: AccountData): Thunk {
    return (dispatch) => {
        dispatch(linkAccountMiddlewareAction(payload));
    };
}

export interface UnlinkAccountMiddlewareAction {
    type: typeof ACCOUNT_UNLINK;
    payload: number;
}
export function unlinkAccountMiddlewareAction(id: number): UnlinkAccountMiddlewareAction {
    return {
        type: ACCOUNT_UNLINK,
        payload: id,
    }
};
export function unlinkAccountMiddlewareActionCreator(id: number): Thunk {
    return (dispatch) => {
        dispatch(unlinkAccountMiddlewareAction(id));
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

export interface UpdateAccountActivitiesPayload {
    id: number;
    activities: Partial<Activities>;
}
export interface UpdateAccountActivitiesMiddlewareAction {
    type: typeof ACCOUNT_UPDATE_ACTIVITIES;
    payload: UpdateAccountActivitiesPayload;
}
export function updateAccountActivitiesMiddlewareAction(payload: UpdateAccountActivitiesPayload): UpdateAccountActivitiesMiddlewareAction {
    return {
        type: ACCOUNT_UPDATE_ACTIVITIES,
        payload,
    };
}
export function updateAccountActivitiesActionMiddlewareCreator(payload: UpdateAccountActivitiesPayload): Thunk {
    return dispatch => {
        dispatch(updateAccountActivitiesMiddlewareAction(payload));
    };
}

export interface UpdateAccountGeneralPayload {
    id: number;
    general: Partial<General>;
}
export interface UpdateAccountGeneralMiddlewareAction {
    type: typeof ACCOUNT_UPDATE_GENERAL;
    payload: UpdateAccountGeneralPayload;
}
export function updateAccountGeneralMiddlewareAction(payload: UpdateAccountGeneralPayload): UpdateAccountGeneralMiddlewareAction {
    return {
        type: ACCOUNT_UPDATE_GENERAL,
        payload,
    };
}
export function updateAccountGeneralMiddlewareActionCreator(payload: UpdateAccountGeneralPayload): Thunk {
    return dispatch => {
        dispatch(updateAccountGeneralMiddlewareAction(payload));
    };
}

