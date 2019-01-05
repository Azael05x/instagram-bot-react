import * as React from "react";
import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import { Path } from "@types";
import { RouteEnhancer } from "../main-router/RouteEnhancer";
import { MainRouterComponents } from "../main-router/MainRouter";
import { ToastConnected } from "../toast/Toast";
import { PopupConnected } from "../popup/Popup";

// Lazily imported chunks in closures
const LazyPasswordChangeLink = () => import(/* webpackChunkName: "register" */"../password-change/PasswordChange");
const LazyPasswordResetLink = () => import(/* webpackChunkName: "register" */"../reset-password/ResetPassword");

export type RootRouterProps = RouteComponentProps<{}>;
export class RootRouterComponent extends React.PureComponent<RootRouterProps> {
    public render() {
        return <>
            <ToastConnected />
            <PopupConnected />
            <Switch>
                <Route
                    exact
                    path={Path.PasswordChangeLink}
                    component={RouteEnhancer(LazyPasswordChangeLink)}
                />
                <Route
                    exact
                    path={Path.PasswordResetLink}
                    component={RouteEnhancer(LazyPasswordResetLink)}
                />
                <Route
                    path={Path.Wildcard}
                    component={MainRouterComponents}
                />
            </Switch>
        </>;
    }
}

export const RootRouter = withRouter(RootRouterComponent);
