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
import {
    hashtagsPlaceholder,
    hashtagsBodyPlaceholder,
    blacklistedHashtagsBodyPlaceholder,
    blacklistedHashtagsPlaceholder,
    blacklistedUsersBodyPlaceholder,
    blacklistedUsersPlaceholder,
    favouriteUsersBodyPlaceholder,
    favouriteUsersPlaceholder,
    videoCommentsBodyPlaceholder,
    videoCommentsPlaceholder,
    imageCommentsBodyPlaceholder,
    imageCommentsPlaceholder,
} from "../../texts/texts";
import { searchTags, searchUsers } from "../../utils/requests";

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
                <div className={styles.section}>
                    <h2>General Activity</h2>
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
                </div>
                <div className={styles.section}>
                    <h2>#Hashtags & @Users</h2>
                    <div className={styles.tagsArea}>
                        <div className={styles.settingsArea}>
                            <InputSelect
                                placeholder={hashtagsPlaceholder}
                                bodyPlaceholder={hashtagsBodyPlaceholder}
                                icon={<i className="fa fa-tags" aria-hidden="true" />}
                                onSubmit={this.onFollowTagsChange}
                                tags={settings.general.tags}
                                onChange={this.onTagInput}
                            />
                        </div>
                        <div className={styles.settingsArea}>
                            <InputSelect
                                placeholder={favouriteUsersPlaceholder}
                                bodyPlaceholder={favouriteUsersBodyPlaceholder}
                                icon={<i className="fa fa-user" aria-hidden="true" />}
                                onSubmit={this.onUserTagsChange}
                                tags={settings.general.users}
                                onChange={this.onUserInput}
                            />
                        </div>
                        <div className={styles.settingsArea}>
                            <InputSelect
                                placeholder={blacklistedHashtagsPlaceholder}
                                bodyPlaceholder={blacklistedHashtagsBodyPlaceholder}
                                icon={<i className="fa fa-ban" aria-hidden="true"></i>}
                                onSubmit={this.onBlacklistedFollowTagsChange}
                                tags={settings.general.blacklistedTags}
                                onChange={this.onTagInput}
                            />
                        </div>
                        <div className={styles.settingsArea}>
                            <InputSelect
                                placeholder={blacklistedUsersPlaceholder}
                                bodyPlaceholder={blacklistedUsersBodyPlaceholder}
                                icon={<i className="fa fa-user-times" aria-hidden="true"></i>}
                                onSubmit={this.onBlacklistedUserTagsChange}
                                tags={settings.general.blacklistedUsers}
                                onChange={this.onUserInput}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <h2>Image & Video Comments</h2>
                    <div className={styles.commentsArea}>
                        <div className={styles.settingsArea}>
                            <InputSelect
                                placeholder={imageCommentsPlaceholder}
                                bodyPlaceholder={imageCommentsBodyPlaceholder}
                                icon={<i className="far fa-image" />}
                                onSubmit={this.onImageCommentsChange}
                                tags={settings.comments.imageComments}
                                type={InputType.TextField}
                                />
                        </div>
                        <div className={styles.settingsArea}>
                            <InputSelect
                                placeholder={videoCommentsPlaceholder}
                                bodyPlaceholder={videoCommentsBodyPlaceholder}
                                icon={<i className="fa fa-play" aria-hidden="true"></i>}
                                onSubmit={this.onVideoCommentsChange}
                                tags={settings.comments.videoComments}
                                type={InputType.TextField}
                                />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    private onLikesToggle = (value: boolean) => {
        this.props.updateAccountActivities({
            id: this.props.account.id,
            data: { enabledLikes: value },
        });
    }
    private onFollowsToggle = (value: boolean) => {
        this.props.updateAccountActivities({
            id: this.props.account.id,
            data: { enabledFollows: value },
        });
    }
    private onUnfollowsToggle = (value: boolean) => {
        this.props.updateAccountActivities({
            id: this.props.account.id,
            data: { enabledUnfollows: value },
        });
    }
    private onCommentsToggle = (value: boolean) => {
        this.props.updateAccountActivities({
            id: this.props.account.id,
            data: { enabledComments: value },
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
        });
    }
    private onUserTagsChange = (value: string[]) => {
        this.props.updateAccountGeneral({
            id: this.props.account.id,
            data: {
                users: value,
            },
        });
    }
    private onBlacklistedFollowTagsChange = (value: string[]) => {
        this.props.updateAccountGeneral({
            id: this.props.account.id,
            data: {
                blacklistedTags: value,
            },
        });
    }
    private onBlacklistedUserTagsChange = (value: string[]) => {
        this.props.updateAccountGeneral({
            id: this.props.account.id,
            data: {
                blacklistedUsers: value,
            },
        });
    }
    private onImageCommentsChange = (value: string[]) => {
        this.props.updateAccountComments({
            id: this.props.account.id,
            data: {
                imageComments: value,
            },
        });
    }
    private onVideoCommentsChange = (value: string[]) => {
        this.props.updateAccountComments({
            id: this.props.account.id,
            data: {
                videoComments: value,
            },
        });
    }
    private onTagInput = (value: string) => {
        return searchTags(this.props.account.id, value);
    }
    private onUserInput = (value: string) => {
        return searchUsers(this.props.account.id, value);
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
