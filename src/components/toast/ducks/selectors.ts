import { InstaState } from "@types";
import { ToastItem } from "./type";

export const selectToasts = (state: InstaState): ToastItem[] => state.toast.toastQueue;
