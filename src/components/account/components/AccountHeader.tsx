import * as React from "react";
import { Link } from "react-router-dom";
import { AccountData } from "@middleware/types";
import { CheckSVG } from "../../icons/Check";
import { TimesSVG } from "../../icons/Times";

import * as styles from "../Account.scss";

export interface AccountHeaderProps {
    account: AccountData;
    isAccountActive: boolean;
}

export class AccountHeader extends React.PureComponent<AccountHeaderProps> {
    public render() {
        const {
            account,
            isAccountActive,
        } = this.props;

        return (
            <Link className={styles.link} to={`/accounts/${account.id}`}>
                <div className={styles.username}>
                    @{account.username}
                </div>
                <div className={styles.status}>
                    <span className={styles.statusLabel}>Status:</span>
                    {isAccountActive ? <CheckSVG /> : <TimesSVG />}
                </div>
            </Link>
        );
    }
}
