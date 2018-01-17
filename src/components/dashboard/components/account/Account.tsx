import * as React from "react";
import * as styles from "./Account.css";

export interface UserAccount {
    username: string;
    settings?: {
        likes: boolean;
        follows: boolean;
        unfollows: boolean;
        comments: boolean;
    };
    active?: boolean;
}

export interface AccountItemProps {
    account: UserAccount;
}

export class AccountItem extends React.PureComponent<AccountItemProps, {}> {
    render() {
        const {
            account,
        } = this.props;

        return (
            <div className={styles.container}>
                <i className={`fa fa-instagram ${styles.icon}`} aria-hidden="true"></i> {account.username}
            </div>
        );
    }
}
