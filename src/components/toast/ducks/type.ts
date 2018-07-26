export enum ToastAnimationType {
    SlideLeft = "slide-to-left",
    SlideDown = "slide-down",
}
export enum ToastType {
    Info = "info",
    Error = "error",
    Success = "success",
}
export interface ToastMessageComposed {
    top: string;
    bottom: string;
}
export type ToastMessage = string | JSX.Element | ToastMessageComposed;
export interface ToastItem {
    message: ToastMessage;
    type?: ToastType;
    id?: number;
    animation?: ToastAnimationType;
}
