import * as React from "react";
import { Link } from "react-router-dom";
import { AccountData } from "@middleware/types";
import * as classnames from "classnames";
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
                    <span style={{ marginRight: ".2rem"}}>Status:</span>
                    {this.setIcon(isAccountActive)}
                </div>
            </Link>
        );
    }

    private setIcon = (isActive: boolean) => {
        /**
         * Such stupid approach of hiding wrapper divs instead of the icon
         * is because font awesome svgs load once. Afterwards you can't
         * unmount/mount with a simple condition
         */
        return <>
            <div style={{ display: `${isActive ? "block" : "none"}`}}>
                <i className={classnames("fas fa-check", styles.active, styles.icon)} />
            </div>
            <div style={{ display: `${!isActive ? "block" : "none"}`}}>
                <i className={classnames("fas fa-times", styles.inactive, styles.icon)} />
            </div>
        </>;
    }
}
