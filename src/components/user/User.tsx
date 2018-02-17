import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

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
