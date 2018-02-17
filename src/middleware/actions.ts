import { Thunk } from "../types/types";
import {
    ACCOUNT_INIT,
    ACCOUNT_LINK,
    ACCOUNT_UNLINK,
    ACCOUNT_UPDATE_ACTIVITIES,
    ACCOUNT_UPDATE_GENERAL,
    ACCOUNT_UPDATE_COMMENTS,
    ACCOUNT_SET_STATUS,
} from "./consts";
import {
    AccountData,
    Activities,
    General,
    Comments,
} from "./types";
import { UpdateAccountPayload } from "../utils/updateAccountTypes";

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

export interface SetAccountStatusMiddlewareAction {
    type: typeof ACCOUNT_SET_STATUS;
    payload: UpdateAccountPayload<AccountData>;
}
export function setAccountStatusMiddlewareAction(
    payload: UpdateAccountPayload<AccountData>,
): SetAccountStatusMiddlewareAction {
    return {
        type: ACCOUNT_SET_STATUS,
        payload,
    }
};
export function setAccountStatusMiddlewareActionCreator(payload: UpdateAccountPayload<AccountData>): Thunk {
    return (dispatch) => {
        dispatch(setAccountStatusMiddlewareAction(payload));
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

export interface UpdateAccountActivitiesMiddlewareAction {
    type: typeof ACCOUNT_UPDATE_ACTIVITIES;
    payload: UpdateAccountPayload<Activities>;
}
export function updateAccountActivitiesMiddlewareAction(
    payload: UpdateAccountPayload<Activities>,
): UpdateAccountActivitiesMiddlewareAction {
    return {
        type: ACCOUNT_UPDATE_ACTIVITIES,
        payload,
    };
}
export function updateAccountActivitiesActionMiddlewareCreator(payload: UpdateAccountPayload<Activities>): Thunk {
    return dispatch => {
        dispatch(updateAccountActivitiesMiddlewareAction(payload));
    };
}

export interface UpdateAccountGeneralMiddlewareAction {
    type: typeof ACCOUNT_UPDATE_GENERAL;
    payload: UpdateAccountPayload<General>;
}
export function updateAccountGeneralMiddlewareAction(
    payload: UpdateAccountPayload<General>
): UpdateAccountGeneralMiddlewareAction {
    return {
        type: ACCOUNT_UPDATE_GENERAL,
        payload,
    };
}
export function updateAccountGeneralMiddlewareActionCreator(payload: UpdateAccountPayload<General>): Thunk {
    return dispatch => {
        dispatch(updateAccountGeneralMiddlewareAction(payload));
    };
}

export interface UpdateAccountCommentsMiddlewareAction {
    type: typeof ACCOUNT_UPDATE_COMMENTS;
    payload: UpdateAccountPayload<Comments>;
}
export function updateAccountCommentsMiddlewareAction(
    payload: UpdateAccountPayload<Comments>,
): UpdateAccountCommentsMiddlewareAction {
    return {
        type: ACCOUNT_UPDATE_COMMENTS,
        payload,
    };
}
export function updateAccountCommentsMiddlewareActionCreator(payload: UpdateAccountPayload<Comments>): Thunk {
    return dispatch => {
        dispatch(updateAccountCommentsMiddlewareAction(payload));
    };
}
