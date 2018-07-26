import {
    ToastItem,
    ToastType,
    ToastAnimationType,
    ToastMessage,
} from "./type";

export const SHOW_TOAST = "toasts/SHOW_TOAST";
export const HIDE_TOAST = "toasts/HIDE_TOAST";

export interface ShowToastAction {
    type: typeof SHOW_TOAST;
    payload: ToastItem;
}
export function showToastAction(
    message: ToastMessage,
    type = ToastType.Info,
    animation = ToastAnimationType.SlideLeft,
): ShowToastAction {
    return {
        type: SHOW_TOAST,
        payload: {
            message,
            type,
            animation,
        },
    };
}

export interface HideToastAction {
    type: typeof HIDE_TOAST;
}
export function hideToastAction(): HideToastAction {
    return {
        type: HIDE_TOAST,
    };
}
