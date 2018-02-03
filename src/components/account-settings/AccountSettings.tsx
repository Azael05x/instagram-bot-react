import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { AccountData, ActivitySpeedType } from "../../middleware/types";
import { Divider, DividerTheme } from "../divider/Divider";
import { ActivitySpeed } from "./components/activity-speed/ActivitySpeed";
import { General } from "./components/general/General";
import { InputSelect, InputType } from "../input-select/InputSelect";
import {
    updateAccountActivitiesActionMiddlewareCreator,
    updateAccountGeneralMiddlewareActionCreator,
    updateAccountCommentsMiddlewareActionCreator,
} from "../../middleware/actions";

import * as styles from "./AccountSettings.css";

export interface AccountSettingsOwnProps {
    account: AccountData;
}
export interface AccountSettingsDispatchProps {
    updateAccountActivities: typeof updateAccountActivitiesActionMiddlewareCreator;
    updateAccountGeneral: typeof updateAccountGeneralMiddlewareActionCreator;
    updateAccountComments: typeof updateAccountCommentsMiddlewareActionCreator;
}

export type AccountSettingsProps =
    & AccountSettingsOwnProps
    & AccountSettingsDispatchProps
    & RouteComponentProps<{}>;

export class AccountSettings extends React.Component<AccountSettingsProps> {
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
                        onChange={this.onFollowTagsChange}
                        tags={settings.general.tags}
                    />
                </div>
                <div className={styles.settingsArea}>
                    <InputSelect
                        placeholder="Enter favourite users you wish to follow"
                        bodyPlaceholder="No favourite users yet. These users posts will have a priority in the system"
                        icon={<i className="fa fa-user" aria-hidden="true" />}
                        onChange={this.onUserTagsChange}
                        tags={settings.general.users}
                    />
                </div>
                <div className={styles.settingsArea}>
                    <InputSelect
                        placeholder="Enter blacklisted hashtags"
                        bodyPlaceholder="No blacklisted hashtags yet. We will not like any post with this hashtag"
                        icon={<i className="fa fa-ban" aria-hidden="true"></i>}
                        onChange={this.onBlacklistedFollowTagsChange}
                        tags={settings.general.blacklisted_tags}
                    />
                </div>
                <div className={styles.settingsArea}>
                    <InputSelect
                        placeholder="Enter blacklisted users"
                        bodyPlaceholder="No blacklisted users yet. We will not like any post directly related to this user"
                        icon={<i className="fa fa-user-times" aria-hidden="true"></i>}
                        onChange={this.onBlacklistedUserTagsChange}
                        tags={settings.general.blacklisted_users}
                    />
                </div>
                <Divider />
                <div className={styles.settingsArea}>
                    <InputSelect
                        placeholder="Enter a list of comments that you want to leave for the liked images. These will be used only for posts with images."
                        bodyPlaceholder="No comments yet. We will not comment with anything else than your specified comments here."
                        icon={<i className="fa fa-photo" aria-hidden="true"></i>}
                        onChange={this.onImageCommentsChange}
                        tags={settings.comments.image_comments}
                        type={InputType.TextField}
                    />
                </div>
                <div className={styles.settingsArea}>
                    <InputSelect
                        placeholder="Enter a list of comments that you want to leave for the liked videos. These will be used only for posts with videos."
                        bodyPlaceholder="No comments yet. We will not comment with anything else than your specified comments here."
                        icon={<i className="fa fa-play" aria-hidden="true"></i>}
                        onChange={this.onVideoCommentsChange}
                        tags={settings.comments.video_comments}
                        type={InputType.TextField}
                    />
                </div>
            </div>
        );
    }
    private onLikesToggle = (value: boolean) => {
        this.props.updateAccountActivities({
            id: this.props.account.id,
            data: { enabled_likes: value },
        });
    }
    private onFollowsToggle = (value: boolean) => {
        this.props.updateAccountActivities({
            id: this.props.account.id,
            data: { enabled_follows: value },
        });
    }
    private onUnfollowsToggle = (value: boolean) => {
        this.props.updateAccountActivities({
            id: this.props.account.id,
            data: { enabled_unfollows: value },
        });
    }
    private onCommentsToggle = (value: boolean) => {
        this.props.updateAccountActivities({
            id: this.props.account.id,
            data: { enabled_comments: value },
        });
    }
    private onSpeedChange = (value: ActivitySpeedType) => {
        this.props.updateAccountActivities({
            id: this.props.account.id,
            data: { speed: value },
        });
    }
    private onFollowTagsChange = (value: string[]) => {
        this.props.updateAccountGeneral({
            id: this.props.account.id,
            data: {
                tags: value,
            },
        })
    }
    private onUserTagsChange = (value: string[]) => {
        this.props.updateAccountGeneral({
            id: this.props.account.id,
            data: {
                users: value,
            },
        })
    }
    private onBlacklistedFollowTagsChange = (value: string[]) => {
        this.props.updateAccountGeneral({
            id: this.props.account.id,
            data: {
                blacklisted_tags: value,
            },
        })
    }
    private onBlacklistedUserTagsChange = (value: string[]) => {
        this.props.updateAccountGeneral({
            id: this.props.account.id,
            data: {
                blacklisted_users: value,
            },
        })
    }
    private onImageCommentsChange = (value: string[]) => {
        this.props.updateAccountComments({
            id: this.props.account.id,
            data: {
                image_comments: value,
            },
        })
    }
    private onVideoCommentsChange = (value: string[]) => {
        this.props.updateAccountComments({
            id: this.props.account.id,
            data: {
                video_comments: value,
            },
        })
    }
}

const mapDispatchToProps: AccountSettingsDispatchProps = {
    updateAccountActivities: updateAccountActivitiesActionMiddlewareCreator,
    updateAccountGeneral: updateAccountGeneralMiddlewareActionCreator,
    updateAccountComments: updateAccountCommentsMiddlewareActionCreator,
};

export const AccountSettingsConnected = withRouter(connect<{}, AccountSettingsDispatchProps>(
    undefined,
    mapDispatchToProps,
)(AccountSettings));
