import { Thunk } from "../types/types";
import {
    ACCOUNT_INIT,
    ACCOUNT_LINK,
    ACCOUNT_UNLINK,
    USER_LOGIN,
} from "./consts";
import { initialState } from "./state";
import {
    selectAccounts,
    selectUser,
} from "./selectors";
import {
    InitAccountAction,
    LoginAction,
    LinkAccountAction,
    UnlinkAccountAction,
} from "./actions";

export type ReducerActions =
    | LoginAction
    | LinkAccountAction
    | UnlinkAccountAction
    | InitAccountAction
;

export function reducer(state = initialState, action: ReducerActions) {
    switch (action.type) {
        case USER_LOGIN: {
            return {
                ...state,
                user: {
                    auth_token: localStorage.getItem("auth_token"),
                    email: action.payload.email,
                }
            }
        }
        case ACCOUNT_INIT: {
            return { ...state, accounts: action.payload };
        }
        case ACCOUNT_LINK: {
            return {
                ...state,
                accounts: [...state.accounts, action.payload],
            };
        }
        case ACCOUNT_UNLINK: {
            const filteredAccounts = state.accounts.filter(account => account.id !== action.payload);
            return {
                ...state,
                accounts: filteredAccounts,
            };
        }
        default:
            return state;
    }
}
