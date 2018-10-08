import * as React from "react";
import { Link } from "react-router-dom";
import { AccountData } from "@middleware/types";
import * as classnames from "classnames";

import * as styles from "./Account.scss";
import { AccountHeader } from "./components/AccountHeader";
import { Button, ButtonSize, ButtonType } from "../button/Button";

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
                    <Button
                        label={this.isAccountActive ? "Pause" : "Start"}
                        onClick={this.onStatusChange}
                        size={ButtonSize.Small}
                        type={this.isAccountActive ? ButtonType.Neutral : ButtonType.Main}
                    />
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
