import * as React from "react";
import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import { Path } from "@types";

import { HeaderConnected } from "../header/Header";
import { Footer } from "../footer/Footer";
import { PopupConnected } from "../popup/Popup";
import { ToastConnected } from "../toast/Toast";

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
import { RouteEnhancer } from "./RouteEnhancer";

export type MainProps = RouteComponentProps<{}>;

export class MainComponent extends React.PureComponent<MainProps> {
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
                            component={RouteEnhancer(LazyLanding)}
                        />
                        <div className={styles.extraSpace}>
                        <Route
                            exact
                            path={Path.Faq}
                            component={RouteEnhancer(LazyFaq)}
                        />

                        <Route
                            path={Path.Profile}
                            component={RouteEnhancer(LazyUser, true)}
                        />
                        <Route
                            path={Path.LinkAccount}
                            component={RouteEnhancer(LazyLinkAccount, true)}
                        />
                        <Route
                            exact
                            path={Path.Dashboard}
                            component={RouteEnhancer(LazyDashboard, true)}
                        />
                        <Route
                            path={Path.AccountsID}
                            component={RouteEnhancer(LazyAccountPage, true)}
                        />
                        <Route
                            path={Path.Login}
                            component={RouteEnhancer(LazyLogin)}
                        />
                        <Route
                            path={Path.Register}
                            component={RouteEnhancer(LazyRegister)}
                        />
                        </div>

                        <Route
                            path={Path.Wildcard}
                            component={RouteEnhancer(LazyNoMatch)}
                        />
                    </Switch>
                </div>
                <PopupConnected />
                <Footer />
            </div>
        );
    }
}

export const Main = withRouter(MainComponent);
