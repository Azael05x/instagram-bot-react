import { AccountData } from "../middleware/types";
import { PopupData } from "../components/popup/factory/PopupData";

export interface User {
    auth_token: string;
    email: string;
}
export interface State {
    user: User;
    accounts: AccountData[];
    popup?: PopupData;
}
// Initial state
export const initialState = {
    user: {
        email: localStorage.getItem("email"),
        auth_token: localStorage.getItem("auth_token"),
    },
    accounts: [],
    popup: undefined,
} as State;
