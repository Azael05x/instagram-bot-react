import { UserAccount } from "../components/dashboard/components/account/Account";

export function createNewAccount(username: string, id: number): UserAccount {
    return {
        username,
        id,
        settings: {
            comments: false,
            follows: false,
            likes: false,
            unfollows: false,
        },
        active: false,
    }
}
