import {
    Middleware,
    MiddlewareAPI,
} from "redux";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import {
    linkAccountActionCreator,
    unlinkAccountActionCreator,
    initAccountActionCreator,
    updateAccountActionCreator,
} from "../ducks/actions";
import {
    ACCOUNT_INIT,
    ACCOUNT_LINK,
    ACCOUNT_UNLINK,
    ACCOUNT_UPDATE_ACTIVITIES,
    ACCOUNT_UPDATE_GENERAL,
    ACCOUNT_UPDATE_COMMENTS,
    ACCOUNT_SET_STATUS,
} from "./consts";
// import { createNewAccount } from "./utils";
import {
    InitAccountMiddlewareAction,
    LinkAccountMiddlewareAction,
    UnlinkAccountMiddlewareAction,
    UpdateAccountActivitiesMiddlewareAction,
    UpdateAccountGeneralMiddlewareAction,
    UpdateAccountCommentsMiddlewareAction,
    SetAccountStatusMiddlewareAction,
} from "./actions";
import { selectUser } from "../ducks/selectors";
import {
    AccountData,
    Activities,
    General,
    Comments,
} from "./types";
import {
    getInitAccountData,
    deleteAccount,
    updateActivities,
    updateGeneral,
    updateComments,
    setAccountStatus,
} from "../utils/requests";

// TODO: Add typings, bitch (ti pro sebja Roland???), da blja
export interface PartialState {
}

export type AccountMiddlewareAction =
    | LinkAccountMiddlewareAction
    | UnlinkAccountMiddlewareAction
    | InitAccountMiddlewareAction
    | UpdateAccountActivitiesMiddlewareAction
    | UpdateAccountGeneralMiddlewareAction
    | UpdateAccountCommentsMiddlewareAction
    | SetAccountStatusMiddlewareAction
;

export function createConfig(userAuthToken: string, options = {}): AxiosRequestConfig {
    return {
        headers: {
            "Authorization": userAuthToken,
        },
        ...options,
    };
}

export const accountMiddleware = (<S extends PartialState>({ dispatch, getState }: MiddlewareAPI<S>) => (next: any) => {
    return (action: AccountMiddlewareAction) => {
        // Required for a REST action to be approved by the server
        const config = createConfig(selectUser(getState()).auth_token);

        switch (action.type) {
            case ACCOUNT_INIT: {
                getInitAccountData(config)
                    .then((response: AxiosResponse<AccountData[]>) => {
                        dispatch(initAccountActionCreator(response.data as any))
                    })
                    .catch(error => {
                        // TODO: Handle error with message
                        console.log("NO SUCH get", error)
                    });
                break;
            }
            case ACCOUNT_LINK: {
                dispatch(linkAccountActionCreator(action.payload));  
                break;
            }
            case ACCOUNT_UNLINK: {
                deleteAccount(action.payload, config)
                    .then(() => {
                        dispatch(unlinkAccountActionCreator(action.payload))
                    })
                    .catch(error => {
                        // TODO: Handle error with message
                        console.log("NO SUCH ACCOUNT", error)
                    });
                break;
            }
            case ACCOUNT_UPDATE_ACTIVITIES: {
                const data: { settings: Partial<Activities> } = {
                    settings: action.payload.data,
                };
       
                updateActivities(action.payload.id, data, config)
                    .catch(error => {
                        console.error("UPDATE FAILED", error)
                    });

                break;
            }
            case ACCOUNT_UPDATE_GENERAL: {
                const data: { settings: Partial<General> } = {
                    settings: action.payload.data,
                };
        
                updateGeneral(action.payload.id, data, config)
                    .catch(error => {
                        console.error("UPDATE FAILED", error)
                    });

                break;
            }
            case ACCOUNT_UPDATE_COMMENTS: {
                const data: { settings: Partial<Comments> } = {
                    settings: action.payload.data,
                };

                updateComments(action.payload.id, data, config)
                    .catch(error => {
                        console.error("UPDATE FAILED", error)
                    });

                break;
            }
            case ACCOUNT_SET_STATUS: {
                const data: { instagram: { is_active: boolean; } } = {
                    instagram: {
                        is_active: action.payload.data.is_active,
                    },
                };

                setAccountStatus(action.payload.id, data, config)
                    .then((response: AxiosResponse<AccountData>) => {
                        dispatch(updateAccountActionCreator({
                            id: action.payload.id,
                            data: response.data,
                        }));
                    })
                    .catch(error => {
                        console.error("UPDATE FAILED", error)
                    });
                
                break;
            }
            default:
        }

        return next(action);
    }
}) as Middleware;
