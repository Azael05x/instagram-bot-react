import * as React from "react";
import { Link } from "react-router-dom";
import * as styles from "./Account.css";
import { AccountData } from "../../middleware/types";

export interface AccountItemState {
    redirect: boolean;
}
export interface AccountItemProps {
    account: AccountData;
    onStatusChange: (account: AccountData) => void;
}

export class AccountItem extends React.PureComponent<AccountItemProps, {}> {
    private isAccountActive = this.props.account.is_active;
    public render() {
        const { account } = this.props;

        return (
            <div className={styles.container}>
                <Link className={styles.link} to={`/accounts/${account.id}`}>
                    <div className={styles.username}>
                        @{account.username}
                    </div>
                    <div className={styles.status}>
                        <span style={{ marginRight: ".2rem"}}>Status:</span>
                        {this.setIcon(this.isAccountActive)}
                    </div>
                </Link>
                <div className={styles.buttons}>
                    <div
                        className={`${styles.button} ${this.isAccountActive ? styles.pauseButton : styles.startButton}`}
                        onClick={this.onStatusChange}
                    >
                        {this.isAccountActive ? "Pause" : "Start"}
                    </div>
                    <Link className={styles.settingsButton} to={`/accounts/${account.id}`}>
                        <i className={`fa fa-cog ${styles.icon}`} aria-hidden="true"></i>
                    </Link>
                </div>
            </div>
        );
    }
    private onStatusChange = () => {
        const { account } = this.props;
        this.isAccountActive = !this.isAccountActive;

        this.props.onStatusChange({
            ...account,
            is_active: this.isAccountActive,
        });
    }
    private setIcon = (isActive: boolean) => {
        return isActive
            ? <i className={`fas fa-check ${styles.active} ${styles.icon}`} />
            : <i className={`fas fa-times ${styles.inactive} ${styles.icon}`} />;
    }
}
