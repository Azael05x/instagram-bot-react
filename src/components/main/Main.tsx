import * as React from "react";
import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { selectUser } from "@ducks/selectors";
import { Path } from "@types";

import { HeaderConnected } from "../header/Header";
import { Footer } from "../footer/Footer";
import { PopupConnected } from "../popup/Popup";
import { ToastConnected } from "../toast/Toast";
import { InterceptorConnected } from "../interceptor/Interceptor";
import { AsyncComponent } from "../async-component/AsyncComponent";

// Lazily imported chunks in closures
const LazyDashboard = () => import(/* webpackChunkName: "dashboard" */"../dashboard/Dashboard");
const LazyFaq = () => import(/* webpackChunkName: "faq" */"../faq/Faq");
const LazyRegister = () => import(/* webpackChunkName: "register" */"../register/Register");
const LazyLanding = () => import(/* webpackChunkName: "landing" */"../landing/Landing");
const LazyAccountPage = () => import(/* webpackChunkName: "accountPage" */"../account-page/AccountPage");
const LazyUser = () => import(/* webpackChunkName: "user" */"../user/User");
const LazyLogin = () => import(/* webpackChunkName: "login" */"../login/Login");
const LazyLinkAccount = () => import(/* webpackChunkName: "linkAccount" */"../link-account/LinkAccount");
const LazyNoMatch = () => import(/* webpackChunkName: "noMatch" */"../no-match/NoMatch");

import * as styles from "./Main.scss";

export interface MainStateProps {
    logged_in: boolean;
}

export type MainProps = MainStateProps & RouteComponentProps<{}>;

export class Main extends React.PureComponent<MainProps> {
    public render() {
        return (
            <div className={styles.container}>
                <ToastConnected />
                <HeaderConnected />
                <div className={styles.bodyContainer}>
                    <Switch>
                        <Route
                            exact
                            path={Path.Home}
                            component={() => <AsyncComponent moduleProvider={LazyLanding} />}
                        />
                        <div className={styles.extraSpace}>
                        <Route
                            exact
                            path={Path.Faq}
                            component={() => <AsyncComponent moduleProvider={LazyFaq} />}
                        />
                        { this.props.logged_in
                            ? <>
                                <Route
                                    path={Path.Profile}
                                    component={() => <AsyncComponent moduleProvider={LazyUser} />}
                                />
                                <Route
                                    path={Path.LinkAccount}
                                    component={() => <AsyncComponent moduleProvider={LazyLinkAccount} />}
                                />
                                <Route
                                    exact
                                    path={Path.Dashboard}
                                    component={() => <AsyncComponent moduleProvider={LazyDashboard} />}
                                />
                                <Route
                                    path={Path.AccountsID}
                                    component={() => <AsyncComponent moduleProvider={LazyAccountPage} />}
                                />
                            </>
                            : <>
                                <Route
                                    path={Path.Login}
                                    component={() => <AsyncComponent moduleProvider={LazyLogin} />}
                                />
                                <Route
                                    path={Path.Register}
                                    component={() => <AsyncComponent moduleProvider={LazyRegister} />}
                                />
                            </>
                            }
                        </div>
                        <Route
                            path={Path.Wildcard}
                            component={() => <AsyncComponent moduleProvider={LazyNoMatch} />}
                        />
                    </Switch>
                </div>
                <PopupConnected />
                <Footer />
                <InterceptorConnected />
            </div>
        );
    }
}

const mapStateToProps = (state: any): MainStateProps => ({
    logged_in: !!selectUser(state).email,
});

export const MainConnected = withRouter(connect<MainStateProps>(
    mapStateToProps,
)(Main));
