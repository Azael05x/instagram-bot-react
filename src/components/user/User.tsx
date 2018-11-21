import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { ChangePasswordConnected } from "./components/ChangePassword";
import { PageTitle } from "../page-title/PageTitle";

import * as styles from "./User.scss";

export type UserProps = RouteComponentProps<{}>;

export class User extends React.Component<UserProps> {
    public render() {
        return <>
            <PageTitle title={"Profile"} />
            <div className={styles.container}>
                <ChangePasswordConnected />
            </div>
        </>;
    }
}

export default User;
