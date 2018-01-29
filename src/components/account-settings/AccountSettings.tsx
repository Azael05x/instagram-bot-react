import * as React from "react";
import { AccountData } from "../../middleware/types";
import { Divider, DividerTheme } from "../divider/Divider";
import { ActivitySpeed } from "./components/activity-speed/ActivitySpeed";
import { General } from "./components/general/General";
import { InputSelect } from "../input-select/InputSelect";

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
                <div className={styles.settingsArea}>
                    <InputSelect
                        placeholder="Enter the hashtags you wish to follow"
                        bodyPlaceholder="No hashtags yet. Posts with at least one of these hashtags will be targeted for your activities"
                        icon={<i className="fa fa-tags" aria-hidden="true" />}
                    />
                </div>
                <div className={styles.settingsArea}>
                    <InputSelect
                        placeholder="Enter favourite users you wish to follow"
                        bodyPlaceholder="No favourite users yet. These users posts will have a priority in the system"
                        icon={<i className="fa fa-user" aria-hidden="true" />}
                    />
                </div>
                <div className={styles.settingsArea}>
                    <InputSelect
                        placeholder="Enter blacklisted hashtags"
                        bodyPlaceholder="No blacklisted hashtags yet. We will not like any post with this hashtag"
                        icon={<i className="fa fa-ban" aria-hidden="true"></i>}
                    />
                </div>
                <div className={styles.settingsArea}>
                    <InputSelect
                        placeholder="Enter blacklisted users"
                        bodyPlaceholder="No blacklisted users yet. We will not like any post directly related to this user"
                        icon={<i className="fa fa-user-times" aria-hidden="true"></i>}
                    />
                </div>
            </div>
        );
    }
}
