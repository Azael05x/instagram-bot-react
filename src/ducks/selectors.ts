import { User } from "./state";
import { AccountData } from "../middleware/types";

export const selectUser = (state: any): User => state.user;
export const selectAccounts = (state: any): AccountData[] => state.accounts;
