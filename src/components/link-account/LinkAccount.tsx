import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { debounce } from "lodash";

import { postAccount } from "@utils/requests";
import { linkAccountAction } from "@ducks/actions";
import { getStatusCodeMessage } from "@utils/getStatusCodeMessage";
import { afterErrorSetState } from "@utils/functions";
import { AccountData } from "@middleware/types";

import { UserForm } from "../user-form/UserForm";
import { ButtonType } from "../button/Button";
import { showToastAction } from "../toast/ducks/actions";
import { ToastType } from "../toast/ducks/type";

import * as styles from "./LinkAccount.scss";
import { selectUser } from "@ducks/selectors";
import { InstaState } from "@types";
import { User } from "@ducks/state";

export interface LinkAccountState {
    username: string;
    password: string;
    loading: boolean;
    redirect: boolean;
}

export interface LinkAccountStateProps {
    user: User;
    // isVerificationNeeded: boolean;
}
export interface LinkAccountDispatchProps {
    addAccount: typeof linkAccountAction;
    showToast: typeof showToastAction;
}
export type LinkAccountProps = LinkAccountDispatchProps & LinkAccountStateProps & RouteComponentProps<{}>;

export class LinkAccount extends React.Component<LinkAccountProps, LinkAccountState> {
    public state = {
        username: "",
        password: "",
        loading: false,
        redirect: false,
    };
    public shouldComponentUpdate(nextProps: LinkAccountProps, nextState: LinkAccountState) {
        return false
            || nextProps.addAccount !== this.props.addAccount
            || nextState.username !== this.state.username
            || nextState.password !== this.state.password
            || nextState.loading !== this.state.loading
            || nextState.redirect !== this.state.redirect
        ;
    }
    public render() {
        return (
            <div className={styles.container}>
                <div className={styles.form}>
                    <h1>Link your Instagram account</h1>
                    <UserForm
                        actionInProgress={this.state.loading}
                        buttonType={ButtonType.Main}
                        redirect={this.state.redirect}
                        redirectEndpoint={"/accounts"}
                        onSubmit={this.onSubmit}
                        buttonLabel={"Link It"}
                        mainInputLabel={"@username"}
                        hasVerification={true} // replace with stateProp
                    />
                </div>
            </div>
        );
    }
    private onSubmit = debounce(async (username: string, password: string, code?: string) => {
        if (!username && !password) {
            return;
        }

        this.setState({ loading: true });
        try {
            const data = (await postAccount({ username, password })).data;

            this.setState({
                loading: false,
                redirect: true,
            }, () => {
                this.props.addAccount(data);
                this.props.showToast(
                    `Successfully linked ${username}'s account`,
                    ToastType.Success,
                );
            });
        } catch (error) {
            // TODO: Check if BE should handle
            const status = error.response && error.response.status;

            afterErrorSetState(status, () => {
                this.setState({ loading: false });
            });
            this.props.showToast(
                getStatusCodeMessage(status),
                ToastType.Error,
            );
        }
    }, 1000, { leading: true, trailing: false });
}

const mapStateToProps = (state: InstaState): LinkAccountStateProps => ({
    user: selectUser(state),
    // isVerificationNeeded: selectIsVerificationNeeded(state),
});
const mapDispatchToProps: LinkAccountDispatchProps = {
    addAccount: linkAccountAction,
    showToast: showToastAction,
};

export const LinkAccountConnected = withRouter(connect<LinkAccountStateProps, LinkAccountDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(LinkAccount));

export default LinkAccountConnected;
