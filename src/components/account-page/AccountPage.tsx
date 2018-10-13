import * as React from "react";
import { connect } from "react-redux";
import {
    RouteComponentProps,
    withRouter,
    Redirect,
} from "react-router-dom";

import {
    unlinkAccountMiddlewareAction,
    setAccountStatusMiddlewareAction,
} from "@middleware/actions";
import { AccountData } from "@middleware/types";
import { getAccountData } from "@utils/requests";
import { openPopupAction, closePopupAction } from "@ducks/actions";
import { Path } from "@types";
import { afterErrorSetState } from "@utils/functions";

import { Divider, DividerTheme } from "../divider/Divider";
import { AccountSettingsConnected } from "../account-settings/AccountSettings";
import { Select, SelectOption } from "../select/Select";
import { Username } from "./components/Username";
import { ActivitiesConnected } from "../activities/Activities";
import { createReloginPopup, createDeletePopup } from "../popup/factory/PopupFactory";
import { ReloginConnected } from "../relogin/Relogin";
import { ButtonType, Button, ButtonSize } from "../button/Button";
import { Statistics } from "../statistics/Statistics";

import * as styles from "./AccountPage.scss";

export enum ScreenDataRole {
    Settings = "settings",
    Statistics = "statistics",
    ActivityReview = "activity_review",
}
export interface Screen {
    label: string;
    component: JSX.Element;
}

export interface AccountPageState {
    account: AccountData;
    activeScreen: ScreenDataRole;
    redirect: boolean;
    reloginPassword: string;
}

export interface AccountPageDispatchProps {
    onDelete: typeof unlinkAccountMiddlewareAction;
    onStatusChange: typeof setAccountStatusMiddlewareAction;
    openPopup: typeof openPopupAction;
    closePopup: typeof closePopupAction;
}
export type AccountPageProps =
    & AccountPageDispatchProps
    & RouteComponentProps<{ id: string }>
;

export class AccountPage extends React.Component<AccountPageProps, AccountPageState> {
    public constructor(props: AccountPageProps) {
        super(props);

        this.state = {
            account: {} as AccountData,
            activeScreen: ScreenDataRole.Settings,
            redirect: false,
            reloginPassword: "",
        };
    }
    public async componentDidMount() {
        const {
            match,
            openPopup,
        } = this.props;

        try {
            const response = await getAccountData(+match.params.id);

            this.setState({ account: response.data }, () => {
                if (this.state.account.hasInvalidSession) {
                    openPopup(createReloginPopup({
                        content: (
                            <ReloginConnected
                                username={this.state.account.username}
                                id={this.state.account.id}
                                isVerificationNeeded={!!this.state.account.verificationUrl}
                            />
                        ),
                    }));
                }
            });
        } catch (error) {
            afterErrorSetState(error.response.status, () => {
                this.setState({
                    redirect: true,
                });
            });
        }
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect exact to={Path.Dashboard} />;
        }

        const { account } = this.state;
        if (!account.id) {
            return null;
        }

        const activityButtonLabel = account.isActive ? "Pause" : "Start";
        const activityButtonType = account.isActive ? ButtonType.Neutral : ButtonType.Main;
        const currentScreen = this.renderScreen();

        const selectOptions: SelectOption[] = [
            {
                dataRole: ScreenDataRole.Settings,
                label: "Settings",
            },
            // {
            //     dataRole: ScreenDataRole.Statistics,
            //     label: "Statistics",
            // },
            // {
            //     dataRole: ScreenDataRole.ActivityReview,
            //     label: "Activity Review",
            // },
        ];

        let currentOption: SelectOption;
        for (const option of selectOptions) {
            if (currentScreen.label === option.label) {
                currentOption = option;
            }
        }

        return (
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <div className={styles.header}>
                        <Username isActive={account.isActive} username={account.username} />
                        <Select
                            onSelectOption={this.onNavigate}
                            selectOptions={selectOptions}
                            currentOption={currentOption}
                        />
                        <div className={styles.buttons}>
                            <Button
                                label={activityButtonLabel}
                                onClick={this.onStatusChange}
                                type={activityButtonType}
                                size={ButtonSize.Small}
                            />
                        </div>
                    </div>
                    <Divider />
                    <div className={styles.body}>
                        {currentScreen.component}
                    </div>
                    <Divider theme={DividerTheme.SmallBigMargin} />
                </div>
                <span className={styles.deleteLink} onClick={this.onDelete}>
                    I want to delete this account
                </span>
            </div>
        );
    }
    private onDelete = () => {
        this.props.openPopup(createDeletePopup({
            buttons: [
                {
                    type: ButtonType.Danger,
                    callback: () => {
                        this.props.onDelete(+this.props.match.params.id);
                        this.props.closePopup();
                        this.setState({
                            redirect: true,
                        });
                    },
                    title: "Delete",
                },
                {
                    type: ButtonType.Neutral,
                    callback: this.props.closePopup,
                    title: "Cancel",
                }
            ]
        }));
    }
    private onStatusChange = () => {
        this.setState(
            {
                account: {
                    ...this.state.account,
                    isActive: !this.state.account.isActive
                },
            },
            () => {
                this.props.onStatusChange({
                    id: this.state.account.id,
                    data: this.state.account,
                });
            }
        );
    }
    private onNavigate = (event: React.MouseEvent<HTMLElement>) => {
        const chosenScreen = event.currentTarget.getAttribute("data-role") as ScreenDataRole;
        if (this.state.activeScreen !== chosenScreen) {
            this.setState({
                activeScreen: chosenScreen,
            });
        }
    }
    // TODO: Possibly move to a util function. Make map function component agnostic
    private renderScreen = (): Screen => {
        return {
            [ScreenDataRole.Settings]: {
                component: <AccountSettingsConnected account={this.state.account} />,
                label: "Settings",
            },
            [ScreenDataRole.Statistics]: {
                component: <Statistics />,
                label: "Statistics",
            },
            [ScreenDataRole.ActivityReview]: {
                component: <ActivitiesConnected accountId={this.state.account.id} />,
                label: "Activity Review",
            },
        }[this.state.activeScreen];
    }
}

const mapDispatchToProps: AccountPageDispatchProps = {
    onDelete: unlinkAccountMiddlewareAction,
    onStatusChange: setAccountStatusMiddlewareAction,
    openPopup: openPopupAction,
    closePopup: closePopupAction,
};

export const AccountPageConnected = withRouter(connect<{}, AccountPageDispatchProps>(
    undefined,
    mapDispatchToProps,
)(AccountPage));

export default AccountPageConnected;
