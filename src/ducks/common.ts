import {
    ACCOUNT_INIT,
    ACCOUNT_LINK,
    ACCOUNT_UNLINK,
    USER_LOGIN,
    ACCOUNT_UPDATE,
    OPEN_POPUP,
    CLOSE_POPUP,
    USER_LOGOUT,
} from "./consts";
import { initialState } from "./state";
import {
    InitAccountAction,
    LoginAction,
    LinkAccountAction,
    UnlinkAccountAction,
    UpdateAccountAction,
    OpenPopupAction,
    ClosePopupAction,
    LogoutAction,
} from "./actions";

export type ReducerActions =
    | LoginAction
    | LogoutAction
    | LinkAccountAction
    | UnlinkAccountAction
    | InitAccountAction
    | UpdateAccountAction
    | OpenPopupAction
    | ClosePopupAction
;

export function reducer(state = initialState, action: ReducerActions) {
    switch (action.type) {
        case USER_LOGIN: {
            return {
                ...state,
                user: {
                    email: action.payload.email,
                }
            };
        }
        case USER_LOGOUT: {
            return {
                ...state,
                user: {},
            };
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
            return {
                ...state,
                accounts: state.accounts.filter(account => account.id !== action.payload),
            };
        }
        case ACCOUNT_UPDATE: {
            const updatedAccounts = state.accounts.map(account => {
                if (account.id === action.payload.id) {
                    return action.payload.data;
                }
                return account;
            });

            return {
                ...state,
                accounts: updatedAccounts,
            };
        }
        case OPEN_POPUP: {
            return {
                ...state,
                popup: action.payload,
            };
        }
        case CLOSE_POPUP: {
            return {
                ...state,
                popup: undefined,
            };
        }
        default:
            return state;
    }
}
