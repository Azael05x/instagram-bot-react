import { AccountData } from "../middleware/types";
import { PopupData } from "../components/popup/factory/PopupData";

export interface User {
    auth_token: string;
    email: string;
}
export interface CommonState {
    user: User;
    accounts: AccountData[];
    popup?: PopupData;
}
// Initial state
export const initialState: CommonState = {
    user: {
        email: localStorage.getItem("email"),
        auth_token: localStorage.getItem("auth_token"),
    },
    accounts: [],
    popup: undefined,
};
