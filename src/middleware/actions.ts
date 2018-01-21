import { Thunk } from "../types/types";
import {
    ACCOUNT_INIT,
    ACCOUNT_LINK,
    ACCOUNT_UNLINK,
} from "./consts";
import { AccountData } from "./types";

// export interface AccountLinking  {
//     username: string;
//     password: string;
// }
export interface LinkAccountMiddlewareActionCreator {
    type: typeof ACCOUNT_LINK;
    payload: AccountData;
}
export function linkAccountMiddlewareAction(payload: AccountData): LinkAccountMiddlewareActionCreator {
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

export interface UnlinkAccountMiddlewareActionCreator {
    type: typeof ACCOUNT_UNLINK;
    payload: number;
}
export function unlinkAccountMiddlewareAction(id: number): UnlinkAccountMiddlewareActionCreator {
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