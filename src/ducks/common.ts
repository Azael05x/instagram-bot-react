import {
    ACCOUNT_INIT,
    ACCOUNT_LINK,
    ACCOUNT_UNLINK,
    USER_LOGIN,
    ACCOUNT_ACTIVITY_UPDATE,
} from "./consts";
import { initialState } from "./state";
import {
    InitAccountAction,
    LoginAction,
    LinkAccountAction,
    UnlinkAccountAction,
    UpdateAccountActivitiesAction,
} from "./actions";

export type ReducerActions =
    | LoginAction
    | LinkAccountAction
    | UnlinkAccountAction
    | InitAccountAction
    | UpdateAccountActivitiesAction
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
            return {
                ...state,
                accounts: state.accounts.filter(account => account.id !== action.payload),
            };
        }
        case ACCOUNT_ACTIVITY_UPDATE: {
            const {
                activities,
                id,
            } = action.payload;

            return {
                ...state,
                accounts: state.accounts.map(account => {
                    if (account.id === id) {
                        return {
                            ...account,
                            settings: {
                                ...account.settings,
                                activities,
                            }
                        };
                    }

                    return account;
                }),
            };
        }
        default:
            return state;
    }
}
