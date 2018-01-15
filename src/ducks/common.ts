import { Thunk } from "../types/types";

export const USER_LOGIN = "user/USER_LOGIN";

export const selectUser = (state: any): User => state.user;

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
    };
}

export interface User {
    logged_in: boolean;
    email: string;
}
export interface State {
    user: User;
}

// Initial state
const initialState = {
    user: {
        email: localStorage.getItem("email"),
        logged_in: localStorage.getItem("auth_token") ? true : false,
    },
} as State;

export type ReducerActions =
    | LoginAction
;

// Reducer
export function reducer(state = initialState, action: ReducerActions) {
    switch (action.type) {
        case USER_LOGIN: {
            return {
                ...state,
                user: {
                    logged_in: true,
                    email: action.payload.email,
                }
            }
        }
        default:
            return state;
    }
}
