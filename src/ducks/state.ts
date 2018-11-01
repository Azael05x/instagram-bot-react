import { AccountData } from "../middleware/types";
import { PopupData } from "../components/popup/factory/PopupData";

export interface User {
    email: string;
    // balance: string;
    challenge_url: string | undefined;
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
        // balance: "0",
        challenge_url: undefined,
    },
    accounts: [],
    popup: undefined,
};
