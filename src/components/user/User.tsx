import * as React from "react";
import { /*Switch, Route, */ RouteComponentProps } from "react-router-dom";

export type UserProps = RouteComponentProps<{}>;

export class User extends React.Component<UserProps, {}> {
    render() {
        return (
            <div>
                USER PAGE
            </div>
        );
    }
}
