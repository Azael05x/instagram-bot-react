import * as React from "react";
import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import { Path } from "@types";
import { RouteEnhancer } from "../main-router/RouteEnhancer";
import { MainRouterComponents } from "../main-router/MainRouter";

// Lazily imported chunks in closures
const LazyPasswordChangeLink = () => import(/* webpackChunkName: "register" */"../password-change/PasswordChange");

export type RootRouterProps = RouteComponentProps<{}>;
export class RootRouterComponent extends React.PureComponent<RootRouterProps> {
    public render() {
        return (
            <Switch>
                <Route
                    path={Path.PasswordChangeLink}
                    component={RouteEnhancer(LazyPasswordChangeLink)}
                />
                <Route
                    path={Path.Wildcard}
                    component={MainRouterComponents}
                />
            </Switch>
        );
    }
}

export const RootRouter = withRouter(RootRouterComponent);
