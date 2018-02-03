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
import { UpdateAccountSettingsPayload } from "../utils/updateAccountTypes";

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
    payload: UpdateAccountSettingsPayload<AccountData>;
}
export function setAccountStatusMiddlewareAction(payload: UpdateAccountSettingsPayload<AccountData>): SetAccountStatusMiddlewareAction {
    return {
        type: ACCOUNT_SET_STATUS,
        payload,
    }
};
export function setAccountStatusMiddlewareActionCreator(payload: UpdateAccountSettingsPayload<AccountData>): Thunk {
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
    payload: UpdateAccountSettingsPayload<Activities>;
}
export function updateAccountActivitiesMiddlewareAction(payload: UpdateAccountSettingsPayload<Activities>): UpdateAccountActivitiesMiddlewareAction {
    return {
        type: ACCOUNT_UPDATE_ACTIVITIES,
        payload,
    };
}
export function updateAccountActivitiesActionMiddlewareCreator(payload: UpdateAccountSettingsPayload<Activities>): Thunk {
    return dispatch => {
        dispatch(updateAccountActivitiesMiddlewareAction(payload));
    };
}

export interface UpdateAccountGeneralMiddlewareAction {
    type: typeof ACCOUNT_UPDATE_GENERAL;
    payload: UpdateAccountSettingsPayload<General>;
}
export function updateAccountGeneralMiddlewareAction(payload: UpdateAccountSettingsPayload<General>): UpdateAccountGeneralMiddlewareAction {
    return {
        type: ACCOUNT_UPDATE_GENERAL,
        payload,
    };
}
export function updateAccountGeneralMiddlewareActionCreator(payload: UpdateAccountSettingsPayload<General>): Thunk {
    return dispatch => {
        dispatch(updateAccountGeneralMiddlewareAction(payload));
    };
}

export interface UpdateAccountCommentsMiddlewareAction {
    type: typeof ACCOUNT_UPDATE_COMMENTS;
    payload: UpdateAccountSettingsPayload<Comments>;
}
export function updateAccountCommentsMiddlewareAction(payload: UpdateAccountSettingsPayload<Comments>): UpdateAccountCommentsMiddlewareAction {
    return {
        type: ACCOUNT_UPDATE_COMMENTS,
        payload,
    };
}
export function updateAccountCommentsMiddlewareActionCreator(payload: UpdateAccountSettingsPayload<Comments>): Thunk {
    return dispatch => {
        dispatch(updateAccountCommentsMiddlewareAction(payload));
    };
}

