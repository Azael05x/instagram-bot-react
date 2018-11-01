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

/**
 * All status codes processed in the app
 * @see https://httpstatuses.com/
 */
export enum StatusCode {
    // 1×× Informational
     Continue = 100,
     SwitchingProtocols = 101,
     Processing = 102,
    // 2×× Success
    OK = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    MultiStatus = 207,
    AlreadyReported = 208,
    IMUsed = 226,
    // 3×× Redirection
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,
    // 4×× Client Error
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    PayloadTooLarge = 413,
    RequestURITooLong = 414,
    UnsupportedMediaType = 415,
    RequestedRangeNotSatisfiable = 416,
    ExpectationFailed= 417,
    MisdirectedRequest = 421,
    UnprocessableEntity = 422,
    Locked = 423,
    FailedDependency = 424,
    UpgradeRequired = 426,
    PreconditionRequired = 428,
    TooManyRequests = 429,
    RequestHeaderFieldsTooLarge = 431,
    ConnectionClosedWithoutResponse = 444,
    UnavailableForLegalReasons = 451,
    ClientClosedRequest = 499,
    // 5×× Server Error
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HTTPVersionNotSupported = 505,
    VariantAlsoNegotiates = 506,
    InsufficientStorage = 507,
    LoopDetected = 508,
    NotExtended = 510,
    NetworkAuthenticationRequired = 511,
    NetworkConnectTimeoutError = 599,
}

export interface SearchBody<P1, P2> {
    data: P1[] | P2[] | undefined;
    status: StatusCode;
}

export interface InputClickTargetEvent extends Event {
    target: HTMLInputElement;
}

export interface BasicCredentials {
    email: string;
    password: string;
}

export type Module = () => Promise<any>;

export interface DailyStatsRaw {
    mediaLiked: number;
    statsAt: string;
    hashtagsCycled: number;
    userFollowers: number;
}
export interface DailyStats {
    mediaLiked: number;
    statsAt: Date;
    hashtagsCycled: number;
    userFollowers: number;
}

export interface PricingData {
    comment: number;
    like: number;
    unfollow: number;
    follow: number;
}
