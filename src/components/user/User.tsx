import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { ChangePassword } from "./components/ChangePassword";
import { showToastAction } from "../toast/ducks/actions";
import { PageTitle } from "../page-title/PageTitle";

import * as styles from "./User.scss";

export interface UserDispatchProps {
    showToast: typeof showToastAction;
}
export type UserProps = RouteComponentProps<{}> & UserDispatchProps;

export class User extends React.Component<UserProps> {
    public render() {
        return <>
            <PageTitle title={"Profile"} />
            <div className={styles.container}>
                <ChangePassword afterOperationCallback={this.props.showToast} />
            </div>
        </>;
    }
}

const mapDispatchToProps: UserDispatchProps = {
    showToast: showToastAction,
};

export const UserConnected = connect<{}, UserDispatchProps>(
    undefined,
    mapDispatchToProps,
)(User);

export default UserConnected;
