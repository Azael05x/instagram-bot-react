import { ToastItem } from "./state";
import { InstaState } from "@types";

export const selectToasts = (state: InstaState): ToastItem[] => state.toast.toastQueue;
