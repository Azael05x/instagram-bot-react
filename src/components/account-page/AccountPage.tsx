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
import { openPopupAction } from "@ducks/actions";
import { Path } from "@types";
import { afterErrorSetState } from "@utils/functions";

import { Divider } from "../divider/Divider";
import { AccountSettingsConnected } from "../account-settings/AccountSettings";
import { Select, SelectOption } from "../select/Select";
import { Username } from "./components/Username";
import { ActivitiesConnected } from "../activities/Activities";
import { createReloginPopup } from "../popup/factory/PopupFactory";
import { ReloginConnected } from "../relogin/Relogin";

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
}
export type AccountPageProps =
    & AccountPageDispatchProps
    & RouteComponentProps<{ id: number }>
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
            const response = await getAccountData(match.params.id);

            this.setState({ account: response.data }, () => {
                if (this.state.account.hasInvalidSession) {
                    openPopup(createReloginPopup({
                        content: (
                            <ReloginConnected
                                username={this.state.account.username}
                                id={this.state.account.id}
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

        const activityButtonClassname =
            `${styles.button} ${account.isActive ? styles.buttonStop : styles.buttonStart}`;
        const activityButtonLabel = account.isActive ? "Pause" : "Start";
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
                            <button
                                className={activityButtonClassname}
                                onClick={this.onStatusChange}
                            >
                                {activityButtonLabel}
                            </button>
                            <button className={`${styles.button} ${styles.buttonDelete}`} onClick={this.onDelete}>
                                Delete <i className="far fa-trash-alt" />
                            </button>
                        </div>
                    </div>
                    <Divider />
                    <div className={styles.body}>
                        {currentScreen.component}
                    </div>
                </div>
            </div>
        );
    }
    private onDelete = () => {
        this.props.onDelete(+this.props.match.params.id);
        this.setState({
            redirect: true,
        });
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
                component: <div />,
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
};

export const AccountPageConnected = withRouter(connect<{}, AccountPageDispatchProps>(
    undefined,
    mapDispatchToProps,
)(AccountPage));

export default AccountPageConnected;
