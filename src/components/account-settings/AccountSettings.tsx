import * as React from "react";
import { AccountData } from "../../middleware/types";
import * as styles from "./AccountSettings.css";

export interface AccountSettingsProps {
    account: AccountData;
}

export class AccountSettings extends React.PureComponent<AccountSettingsProps> {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.settingsArea}></div>
                <div className={styles.settingsArea}></div>
                <div className={styles.settingsArea}></div>
                <div className={styles.settingsArea}></div>
            </div>
        );
    }
}
