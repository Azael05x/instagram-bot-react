import * as React from "react";
import { Link } from "react-router-dom";
import * as styles from "./Account.css";

export interface UserAccount {
    id: number;
    username: string;
    settings?: {
        likes: boolean;
        follows: boolean;
        unfollows: boolean;
        comments: boolean;
    };
    active?: boolean;
}

export interface AccountItemState {
    redirect: boolean;
}
export interface AccountItemProps {
    account: UserAccount;
}

export class AccountItem extends React.PureComponent<AccountItemProps, {}> {
    public render() {
        const {
            account,
        } = this.props;

        return (
            <div className={styles.container}>
                <Link className={styles.link} to={`/accounts/${account.id}`}>
                    <div className={styles.username}>
                        @{account.username}
                    </div>
                    <div className={styles.status}>
                        <span style={{ marginRight: ".2rem"}}>Status:</span>
                        {this.isActive(account.active)}
                    </div>
                </Link>
                <div className={styles.buttons}>
                    <div className={`${styles.button} ${account.active ? styles.pauseButton : styles.startButton}`}>
                        {account.active ? "Pause" : "Start"}
                    </div>
                    <div className={styles.settingsButton}>
                        <i className={`fa fa-cog ${styles.icon}`} aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        );
    }
    private isActive = (active: boolean) => {
        return active
            ? <i className={`fa fa-check ${styles.active} ${styles.icon}`} aria-hidden="true" />
            : <i className={`fa fa-times ${styles.inactive} ${styles.icon}`} aria-hidden="true" />
    }
}
