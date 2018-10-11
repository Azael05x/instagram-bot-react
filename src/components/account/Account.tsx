import * as React from "react";
import { AccountData } from "@middleware/types";
import { AccountHeader } from "./components/AccountHeader";
import { Button, ButtonSize, ButtonType } from "../button/Button";

import * as styles from "./Account.scss";

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
