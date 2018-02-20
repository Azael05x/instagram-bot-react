import { User, State } from "./state";
import { AccountData } from "../middleware/types";
import { PopupData } from "../components/popup/factory/PopupData";

export const selectUser = (state: State): User => state.user;
export const selectAccounts = (state: State): AccountData[] => state.accounts;
export const selectPopup = (state: State): PopupData => state.popup;
