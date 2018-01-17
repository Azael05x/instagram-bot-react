import { UserAccount } from "../components/dashboard/components/account/Account";

export function createNewAccount(username: string): UserAccount {
    return {
        username,
        settings: {
            comments: false,
            follows: false,
            likes: false,
            unfollows: false,
        },
        active: false,
    }
}
