import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { AccountData, ActivitySpeedType } from "../../middleware/types";
import { Divider, DividerTheme } from "../divider/Divider";
import { ActivitySpeed } from "./components/activity-speed/ActivitySpeed";
import { General } from "./components/general/General";
import { InputSelect } from "../input-select/InputSelect";
import { updateAccountActivitiesActionMiddlewareCreator } from "../../middleware/actions";

import * as styles from "./AccountSettings.css";

export interface AccountSettingsOwnProps {
    account: AccountData;
}
export interface AccountSettingsDispatchProps {
    updateAccountActivities: typeof updateAccountActivitiesActionMiddlewareCreator;
}

export type AccountSettingsProps =
    & AccountSettingsOwnProps
    & AccountSettingsDispatchProps
    & RouteComponentProps<{}>;

export class AccountSettings extends React.PureComponent<AccountSettingsProps> {
    public render() {
        if (!this.props.account.id) {
            return null;
        }

        const { settings } = this.props.account;
        return (
            <div className={styles.container}>
                <div className={styles.settingsArea}>
                    <div className={styles.settingsAreaRow}>
                        <ActivitySpeed
                            speed={settings.activities.speed}
                            onChange={this.onSpeedChange}
                        />
                    </div>
                    <Divider theme={DividerTheme.Small} />
                    <div className={styles.settingsAreaRow}>
                        <General
                            values={settings.activities}
                            onLikesToggle={this.onLikesToggle}
                            onCommentsToggle={this.onCommentsToggle}
                            onFollowsToggle={this.onFollowsToggle}
                            onUnfollowsToggle={this.onUnfollowsToggle}
                        />
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
    private onLikesToggle = (value: boolean) => {
        this.props.updateAccountActivities({
            id: this.props.account.id,
            activities: { enabled_likes: value },
        });
    }
    private onFollowsToggle = (value: boolean) => {
        this.props.updateAccountActivities({
            id: this.props.account.id,
            activities: { enabled_follows: value },
        });
    }
    private onUnfollowsToggle = (value: boolean) => {
        this.props.updateAccountActivities({
            id: this.props.account.id,
            activities: { enabled_unfollows: value },
        });
    }
    private onCommentsToggle = (value: boolean) => {
        this.props.updateAccountActivities({
            id: this.props.account.id,
            activities: { enabled_comments: value },
        });
    }
    private onSpeedChange = (value: ActivitySpeedType) => {
        this.props.updateAccountActivities({
            id: this.props.account.id,
            activities: { speed: value },
        });
    }
}

const mapDispatchToProps: AccountSettingsDispatchProps = {
    updateAccountActivities: updateAccountActivitiesActionMiddlewareCreator,
};

export const AccountSettingsConnected = withRouter(connect<{}, AccountSettingsDispatchProps>(
    undefined,
    mapDispatchToProps,
)(AccountSettings));
