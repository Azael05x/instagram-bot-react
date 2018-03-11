import { ToastItem } from "./state";
import { InstaState } from "../../../types/rootState";

export const selectToasts = (state: InstaState): ToastItem[] => state.toast.toastQueue;
