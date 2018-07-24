import * as React from "react";
import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { selectUser } from "@ducks/selectors";
import { Path } from "@types";

import { HeaderConnected } from "../header/Header";
import { User } from "../user/User";
import { LoginConnected } from "../login/Login";
import { DashboardConnected } from "../dashboard/Dashboard";
import { NoMatch } from "../no-match/NoMatch";
import { LinkAccountConnected } from "../link-account/LinkAccount";
import { AccountPageConnected } from "../account-page/AccountPage";
import { LandingConnected } from "../landing/Landing";
import { Footer } from "../footer/Footer";
import { PopupConnected } from "../popup/Popup";
import { ToastConnected } from "../toast/Toast";
import { Register } from "../register/Register";
import { Faq } from "../faq/Faq";
import { InterceptorConnected } from "../interceptor/Interceptor";

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
                        <Route exact path={Path.Home} component={LandingConnected} />
                        <div className={styles.extraSpace}>
                        <Route exact path={Path.Faq} component={Faq} />
                        { this.props.logged_in
                            ? <>
                                <Route path={Path.Profile} component={User} />
                                <Route path={Path.LinkAccount} component={LinkAccountConnected} />
                                <Route exact path={Path.Accounts} component={DashboardConnected} />
                                <Route path={Path.AccountsID} component={AccountPageConnected} />
                            </>
                            : <>
                                <Route path={Path.Login} component={LoginConnected} />
                                <Route path={Path.Register} component={Register} />
                            </>
                            }
                        </div>
                        <Route path={Path.Wildcard} component={NoMatch} />
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
