import * as React from "react";
import { Switch, Route } from "react-router-dom";

export interface UserProps {
    match: {
        params: { [key: string]: any };
    };
}


export class User extends React.PureComponent<UserProps, {}> {
    render() {
        return (
            <div>
                USER PAGE
            </div>
        );
    }
}
