import * as React from "react";
import { Link } from "react-router-dom";
import { AccountData } from "@middleware/types";
import * as classnames from "classnames";

import * as styles from "./Account.scss";
import { AccountHeader } from "./components/AccountHeader";

export interface AccountItemState {
    redirect: boolean;
}
export interface AccountItemProps {
    account: AccountData;
    onStatusChange: (account: AccountData) => void;
}

export class AccountItem extends React.PureComponent<AccountItemProps> {
    private isAccountActive = this.props.account.isActive;
    public render() {
        const { account } = this.props;

        /**
         * Disabled until further design changes
         */
        const settingsComponent = false && (
            <Link className={styles.settingsButton} to={`/accounts/${account.id}`}>
                <i className={classnames("fa fa-cog", styles.icon)} aria-hidden="true" />
            </Link>
        );

        return (
            <div className={styles.container}>
                <AccountHeader
                    account={account}
                    isAccountActive={this.isAccountActive}
                />
                <div className={styles.buttons}>
                    <div
                        className={classnames(
                            styles.button,
                            this.isAccountActive ? styles.pauseButton : styles.startButton
                        )}
                        onClick={this.onStatusChange}
                    >
                        {this.isAccountActive ? "Pause" : "Start"}
                    </div>
                    {settingsComponent}
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
}
