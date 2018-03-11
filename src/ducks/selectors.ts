import { User } from "./state";
import { AccountData } from "../middleware/types";
import { PopupData } from "../components/popup/factory/PopupData";
import { InstaState } from "../types/rootState";

export const selectUser = (state: InstaState): User => state.common.user;
export const selectAccounts = (state: InstaState): AccountData[] => state.common.accounts;
export const selectPopup = (state: InstaState): PopupData => state.common.popup;
