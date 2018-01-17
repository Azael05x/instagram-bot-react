import { User } from "./state";
import { UserAccount } from "../components/dashboard/components/account/Account";

export const selectUser = (state: any): User => state.user;
export const selectAccounts = (state: any): UserAccount[] => state.accounts;
