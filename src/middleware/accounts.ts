import {
    Middleware,
    MiddlewareAPI,
} from "redux";
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

import {
    InitAccountMiddlewareAction,
    LinkAccountMiddlewareAction,
    UnlinkAccountMiddlewareAction,
    UpdateAccountActivitiesMiddlewareAction,
    UpdateAccountGeneralMiddlewareAction,
    UpdateAccountCommentsMiddlewareAction,
    SetAccountStatusMiddlewareAction,
} from "./actions";
import {
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

export const accountMiddleware = (<S>({ dispatch }: MiddlewareAPI<S>) => (next: any) => {
    return async (action: AccountMiddlewareAction) => {

        switch (action.type) {
            case ACCOUNT_INIT: {
                try {
                    const response = await getInitAccountData();
                    dispatch(initAccountActionCreator(response.data));
                } catch (error) {
                    // TODO: Handle error with message
                    console.error("FAILED ACCOUNT INIT", error);
                }

                break;
            }
            case ACCOUNT_LINK: {
                dispatch(linkAccountActionCreator(action.payload));
                break;
            }
            case ACCOUNT_UNLINK: {
                try {
                    await deleteAccount(action.payload);
                    dispatch(unlinkAccountActionCreator(action.payload));
                } catch (error) {
                        // TODO: Handle error with message
                        console.error("NO SUCH ACCOUNT", error);
                }

                break;
            }
            case ACCOUNT_UPDATE_ACTIVITIES: {
                const data: { settings: Partial<Activities> } = {
                    settings: action.payload.data,
                };

                try {
                    await updateActivities(action.payload.id, data);
                } catch (error) {
                    console.error("UPDATE FAILED", error);
                }

                break;
            }
            case ACCOUNT_UPDATE_GENERAL: {
                const data: { settings: Partial<General> } = {
                    settings: action.payload.data,
                };

                try {
                    await updateGeneral(action.payload.id, data);
                } catch (error) {
                    console.error("UPDATE FAILED", error);
                }

                break;
            }
            case ACCOUNT_UPDATE_COMMENTS: {
                const data: { settings: Partial<Comments> } = {
                    settings: action.payload.data,
                };

                try {
                    await updateComments(action.payload.id, data);
                } catch (error) {
                    console.error("UPDATE FAILED", error);
                }

                break;
            }
            case ACCOUNT_SET_STATUS: {
                const data = {
                    instagram: {
                        isActive: action.payload.data.isActive,
                    },
                };

                try {
                    await setAccountStatus(action.payload.id, data);
                    dispatch(updateAccountActionCreator({
                        id: action.payload.id,
                        data: action.payload.data,
                    }));
                } catch (error) {
                    console.error("UPDATE FAILED", error);
                }

                break;
            }
            default:
        }

        return next(action);
    };
}) as Middleware;
