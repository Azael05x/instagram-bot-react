import { initialState, ToastState } from "./state";
import {
    ShowToastAction,
    HideToastAction,
    SHOW_TOAST,
    HIDE_TOAST,
} from "./actions";

export type ReducerActions =
    | ShowToastAction
    | HideToastAction
;

export function toastReducer(
    state = initialState,
    action: ReducerActions,
): ToastState {
    switch(action.type) {
        case SHOW_TOAST: {
            return {
                toastQueue: [
                    ...state.toastQueue,
                    // Add unique id to eliminate rerendering same Toast
                    { ...action.payload, id: window.performance.now() },
                ],
            };
        }
        case HIDE_TOAST: {
            const newState = [...state.toastQueue];
            // Remove the oldest toast from the queue
            newState.shift();
            return { toastQueue: newState };
        }
        default:
            return state;
    }
}
