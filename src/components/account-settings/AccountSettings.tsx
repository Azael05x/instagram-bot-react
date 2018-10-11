import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import { AccountData } from "@middleware/types";
import {
    updateAccountActivitiesMiddlewareAction,
    updateAccountGeneralMiddlewareAction,
    updateAccountCommentsMiddlewareAction,
    updateAccountFollowsMiddlewareAction,
} from "@middleware/actions";
import {
    hashtagsPlaceholder,
    hashtagsBodyPlaceholder,
    blacklistedHashtagsBodyPlaceholder,
    blacklistedHashtagsPlaceholder,
    blacklistedUsersBodyPlaceholder,
    blacklistedUsersPlaceholder,
} from "@texts";
import { searchTags, searchUsers } from "@utils/requests";

import { InputSelect } from "../input-select/InputSelect";

import * as styles from "./AccountSettings.scss";
import { UserTimesSVG } from "../icons/UserTimes";
import { BanSVG } from "../icons/Ban";
import { TagsSVG } from "../icons/Tags";

export interface AccountSettingsOwnProps {
    account: AccountData;
}
export interface AccountSettingsDispatchProps {
    updateAccountActivities: typeof updateAccountActivitiesMiddlewareAction;
    updateAccountFollows: typeof updateAccountFollowsMiddlewareAction;
    updateAccountGeneral: typeof updateAccountGeneralMiddlewareAction;
    updateAccountComments: typeof updateAccountCommentsMiddlewareAction;
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
                    <h2>#Hashtags</h2>
                    <div className={styles.tagsArea}>
                        <div className={styles.settingsArea}>
                            <InputSelect
                                placeholder={hashtagsPlaceholder}
                                bodyPlaceholder={hashtagsBodyPlaceholder}
                                icon={<TagsSVG fill={"#000"} />}
                                onSubmit={this.onFollowTagsChange}
                                tags={settings.general.tags}
                                onChange={this.onTagInput}
                            />
                        </div>
                        <div className={styles.settingsArea}>
                            <InputSelect
                                placeholder={blacklistedHashtagsPlaceholder}
                                bodyPlaceholder={blacklistedHashtagsBodyPlaceholder}
                                icon={<BanSVG fill={"#000"} />}
                                onSubmit={this.onBlacklistedFollowTagsChange}
                                tags={settings.general.blacklistedTags}
                                onChange={this.onTagInput}
                            />
                        </div>
                        <div className={styles.settingsArea}>
                            <InputSelect
                                placeholder={blacklistedUsersPlaceholder}
                                bodyPlaceholder={blacklistedUsersBodyPlaceholder}
                                icon={<UserTimesSVG fill={"#000"} />}
                                onSubmit={this.onBlacklistedUserTagsChange}
                                tags={settings.general.blacklistedUsers}
                                onChange={this.onUserInput}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    private onFollowTagsChange = (value: string[]) => {
        this.props.updateAccountGeneral({
            id: this.props.account.id,
            data: {
                tags: value,
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

    private onTagInput = (value: string) => {
        return searchTags(this.props.account.id, value);
    }
    private onUserInput = (value: string) => {
        return searchUsers(this.props.account.id, value);
    }
}

const mapDispatchToProps: AccountSettingsDispatchProps = {
    updateAccountActivities: updateAccountActivitiesMiddlewareAction,
    updateAccountFollows: updateAccountFollowsMiddlewareAction,
    updateAccountGeneral: updateAccountGeneralMiddlewareAction,
    updateAccountComments: updateAccountCommentsMiddlewareAction,
};

export const AccountSettingsConnected = withRouter(connect<{}, AccountSettingsDispatchProps>(
    undefined,
    mapDispatchToProps,
)(AccountSettings));
