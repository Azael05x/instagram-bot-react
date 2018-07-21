import * as React from "react";
import { Link } from "react-router-dom";
import { AccountData } from "@middleware/types";

import * as styles from "./Account.scss";

export interface AccountItemState {
    redirect: boolean;
}
export interface AccountItemProps {
    account: AccountData;
    onStatusChange: (account: AccountData) => void;
}

export class AccountItem extends React.PureComponent<AccountItemProps, {}> {
    private isAccountActive = this.props.account.isActive;
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
        this.isAccountActive = !this.isAccountActive;

        this.props.onStatusChange({
            ...this.props.account,
            isActive: this.isAccountActive,
        });
    }
    private setIcon = (isActive: boolean) => {
        /**
         * Such stupid approach of hiding wrapper divs instead of the icon
         * is because font awesome svgs load once. Afterwards you can't
         * unmount/mount with a simple condition
         */
        return <>
            <div style={{ display: `${isActive ? "block" : "none"}`}}>
                <i className={`fas fa-check ${styles.active} ${styles.icon}`} />
            </div>
            <div style={{ display: `${!isActive ? "block" : "none"}`}}>
                <i className={`fas fa-times ${styles.inactive} ${styles.icon}`} />
            </div>
        </>;
    }
}
