import { Action, Dispatch } from "redux";

export type __FIX_ME_TS4023 = Dispatch<any>;

export type ThunkAction<R, S, E = undefined> = (dispatch: Dispatch<S>, getState: () => S, extraArgument?: E) => R;
export type Thunk<S = any> = ThunkAction<void, S, any>;

export interface ThunkDispatch<S> {
    <R, E>(asyncAction: ThunkAction<R, S, E>): R;
    <A extends Action>(action: A): A;
}

/**
 * TypeScript middleware fix for ThunkAction and Action incompatibility
 * @param action
 * @returns {action is Function}
 */

 // @ts-ignore
export const isAsyncAction = (action: any): action is Function => false;

export interface SearchTagItem {
    id: string;
    mediaCount: number;
    name: string;
}
export interface SearchUserItem {
    id: number;
    byline: string;
    followerCount: number;
    fullName: string;
    isVerified: boolean;
    profilePicUrl: string;
    username: string;
}

export type StatusCodes =
    | 200
    | 403
    | 500
    | 401
;

export interface SearchBody<P1, P2> {
    body: {
        result: P1[] | P2[] | undefined;
        status: StatusCodes;
    };
}
