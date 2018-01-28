import * as React from "react";
import { AccountData } from "../../middleware/types";
import { Divider, DividerTheme } from "../divider/Divider";
import { ActivitySpeed } from "./components/activity-speed/ActivitySpeed";
import { General } from "./components/general/General";

import * as styles from "./AccountSettings.css";

export interface AccountSettingsProps {
    account: AccountData;
}

export class AccountSettings extends React.PureComponent<AccountSettingsProps> {
    public render() {
        return (
            <div className={styles.container}>
                <div className={styles.settingsArea}>
                    <div className={styles.settingsAreaRow}>
                        <ActivitySpeed />
                    </div>
                    <Divider theme={DividerTheme.Small} />
                    <div className={styles.settingsAreaRow}>
                        <General />
                    </div>
                </div>
                <div className={styles.settingsArea}></div>
                <div className={styles.settingsArea}></div>
                <div className={styles.settingsArea}></div>
            </div>
        );
    }
}
