import * as React from "react";
import { connect } from "react-redux";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import {
    RouteComponentProps,
    withRouter,
    Redirect,
} from "react-router-dom";

import { unlinkAccountMiddlewareActionCreator } from "../../middleware/actions";
import { getAccountData } from "../../utils/requests";
import { selectUser } from "../../ducks/selectors";
import { AccountData } from "../../middleware/types";
import { Divider } from "../divider/Divider";
import { AccountSettings } from "../account-settings/AccountSettings";
import { Select, SelectOption } from "../select/Select";
import { Username } from "./components/Username";

import * as styles from "./AccountPage.css";

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
    redirect: boolean,
}

export interface AccountPageStateProps {
    auth_token: string;
}
export interface AccountPageDispatchProps {
    onDelete: typeof unlinkAccountMiddlewareActionCreator;
}
export type AccountPageProps =
    & AccountPageDispatchProps
    & AccountPageStateProps
    & RouteComponentProps<{ id: number }>
;

export class AccountPage extends React.Component<AccountPageProps, AccountPageState> {
    public constructor(props: AccountPageProps) {
        super(props);

        this.state = {
            account: {} as AccountData,
            activeScreen: ScreenDataRole.Settings, // TODO: Make navigation listen to active screen
            redirect: false,
        }
    }
    public componentWillMount() {
        const config: AxiosRequestConfig = {
            headers: {
                "Authorization": this.props.auth_token,
            }
        };

        getAccountData(this.props.match.params.id, config)
            .then((response: AxiosResponse<AccountData>) => {
                this.setState({ account: response.data });
            })
            .catch(() => {
                /*
                    Current solution for redirecting user if the accounts page
                    is unavailable or the user is not found.

                    TODO: Investigate possibility to handle this with React Router
                 */
                this.setState({
                    redirect: true,
                });
            });
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect exact to="/accounts" />;
        }

        const { account } = this.state;
        const activityButtonClassname = `${styles.button} ${account.is_active ? styles.buttonStop : styles.buttonStart}`;
        const activityButtonLabel = account.is_active ? "Pause" : "Start"
        const currentScreen = this.renderScreen();

        const selectOptions: SelectOption[] = [
            {
                dataRole: ScreenDataRole.Settings,
                label: "Settings",
            },
            {
                dataRole: ScreenDataRole.Statistics,
                label: "Statistics",
            },
            {
                dataRole: ScreenDataRole.ActivityReview,
                label: "Activity Review",
            },
        ];

        return (
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <div className={styles.header}>
                        <Username isActive={account.is_active} username={account.username} />
                        <Select
                            onSelectOption={this.onNavigate}
                            selectOptions={selectOptions}
                        />
                        <div className={styles.buttons}>
                            <button className={activityButtonClassname}>
                                {activityButtonLabel} <i className="fa fa-play" aria-hidden="true"></i>
                            </button>
                            <button className={`${styles.button} ${styles.buttonDelete}`} onClick={this.onDelete}>
                                Delete <i className="fa fa-trash-o" aria-hidden="true"></i>
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
                component: <AccountSettings account={this.state.account} />,
                label: "Settings",
            },
            [ScreenDataRole.Statistics]: {
                component: <div />,
                label: "Statistics",
            },
            [ScreenDataRole.ActivityReview]: {
                component: <div />,
                label: "Activity Review",
            },
        }[this.state.activeScreen];
    }
}

const mapStateToProps = (state: any): AccountPageStateProps => ({
    auth_token: selectUser(state).auth_token,
});

const mapDispatchToProps = {
    onDelete: unlinkAccountMiddlewareActionCreator,
}

export const AccountPageConnected = withRouter(connect<AccountPageStateProps, AccountPageDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(AccountPage));
