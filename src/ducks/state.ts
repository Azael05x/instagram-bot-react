// import { UserAccount } from "../components/dashboard/components/account/Account";
import { AccountData } from "../middleware/types";

export interface User {
    auth_token: string;
    email: string;
}
export interface State {
    user: User;
    accounts: AccountData[];
}
// Initial state
export const initialState = {
    user: {
        email: localStorage.getItem("email"),
        auth_token: localStorage.getItem("auth_token"),
    },
    accounts: [],
} as State;
