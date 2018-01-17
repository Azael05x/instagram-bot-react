export interface User {
    auth_token: string;
    email: string;
}
export interface State {
    user: User;
    accounts: Account[];
}
// Initial state
export const initialState = {
    user: {
        email: localStorage.getItem("email"),
        auth_token: localStorage.getItem("auth_token"),
    },
    accounts: [],
} as State;
