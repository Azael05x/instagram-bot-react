import { ToastItem } from "./type";

export interface ToastState {
    toastQueue: ToastItem[];
}
export const initialState: ToastState = {
    toastQueue: [],
};
