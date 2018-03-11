export enum ToastAnimationType {
    SlideLeft = "slide-to-left",
    SlideDown = "slide-down",
}
export enum ToastType {
    Info = "info",
    Error = "error",
    Success = "success",
}
export interface ToastItem {
    message: string | JSX.Element;
    type?: ToastType;
    id?: number;
    animation?: ToastAnimationType;
}

export interface ToastState {
    toastQueue: ToastItem[];
}
export const initialState: ToastState = {
    toastQueue: [],
};
