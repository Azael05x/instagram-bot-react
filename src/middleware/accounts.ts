import {
    Middleware,
    MiddlewareAPI,
} from "redux";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import {
    linkAccountActionCreator,
    unlinkAccountActionCreator,
    initAccountActionCreator,
} from "../ducks/actions";
import {
    ACCOUNT_INIT,
    ACCOUNT_LINK,
    ACCOUNT_UNLINK,
    ACCOUNT_UPDATE_ACTIVITIES,
    ACCOUNT_UPDATE_GENERAL,
} from "./consts";
// import { createNewAccount } from "./utils";
import {
    InitAccountMiddlewareAction,
    LinkAccountMiddlewareAction,
    UnlinkAccountMiddlewareAction,
    UpdateAccountActivitiesMiddlewareAction,
    UpdateAccountGeneralMiddlewareAction,
} from "./actions";
import { selectUser } from "../ducks/selectors";
import {
    AccountData,
    Activities,
    General,
} from "./types";
import {
    getInitAccountData,
    deleteAccount,
    updateActivities,
    updateGeneral,
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
;

export const accountMiddleware = (<S extends PartialState>({ dispatch, getState }: MiddlewareAPI<S>) => (next: any) => {
    return (action: AccountMiddlewareAction) => {
        switch (action.type) {
            case ACCOUNT_INIT: {
                const config = {
                    headers: {
                        "Authorization": selectUser(getState()).auth_token,
                    },
                };
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
            case  ACCOUNT_LINK: {
                dispatch(linkAccountActionCreator(action.payload));  
                break;
            }
            case ACCOUNT_UNLINK: {
                const config: AxiosRequestConfig = {
                    headers: {
                        "Authorization": selectUser(getState()).auth_token,
                    },
                };

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
                    settings: action.payload.activities,
                };
                const config = {
                    headers: {
                        "Authorization": selectUser(getState()).auth_token,
                    }
                };
        
                updateActivities(action.payload.id, data, config)
                    .catch(error => {
                        console.error("UPDATE FAILED", error)
                    });

                break;
            }
            case ACCOUNT_UPDATE_GENERAL: {
                const data: { settings: Partial<General> } = {
                    settings: action.payload.general,
                };
                const config = {
                    headers: {
                        "Authorization": selectUser(getState()).auth_token,
                    }
                };
        
                updateGeneral(action.payload.id, data, config)
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
