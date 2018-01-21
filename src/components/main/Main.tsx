import * as React from "react";
import * as styles from "./Main.css";
import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { HeaderConnected } from "../header/Header";
import { User } from "../user/User";
import { LoginConnected } from "../login/Login";
import { DashboardConnected } from "../dashboard/Dashboard";
import { selectUser } from "../../ducks/selectors";
import { NoMatch } from "../no-match/NoMatch";
import { LinkAccountConnected } from "../link-account/LinkAccount";
import { AccountPageConnected } from "../account-page/AccountPage";
import { Landing } from "../landing/Landing";

export interface MainStateProps {
    logged_in: boolean;
}

export type MainProps = MainStateProps & RouteComponentProps<{}>;

export class Main extends React.PureComponent<MainProps, {}> {
    render() {
        return (
            <div className={styles.container}>
                <HeaderConnected />
                <Switch>
                    <Route exact path="/" component={Landing} />
                    { this.props.logged_in
                        ? (
                            <>
                                <Route path="/profile" component={User} />
                                <Route path="/link-account" component={LinkAccountConnected} />
                                <Route exact path="/accounts" component={DashboardConnected} />
                                <Route path="/accounts/:id" component={AccountPageConnected} />
                            </>
                        )
                        : <Route path="/login" component={LoginConnected} />
                    }
                    <Route path="*" component={NoMatch} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state: any): MainStateProps => ({
    logged_in: !!selectUser(state).auth_token,
});

export const MainConnected = withRouter(connect<MainStateProps, {}>(
    mapStateToProps,
    undefined,
)(Main));
