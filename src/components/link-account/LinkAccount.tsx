import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { AxiosResponse } from "axios";
import { throttle } from "lodash";

import { postAccount } from "../../utils/requests";
import { AccountData } from "../../middleware/types";
import { linkAccountActionCreator } from "../../ducks/actions";
import { UserForm } from "../user-form/UserForm";
import { ButtonType } from "../button/Button";
import { showToastAction } from "../toast/ducks/actions";
import { getErrorMessage } from "../error-message/utils";
import { ToastType } from "../toast/ducks/state";

import * as styles from "./LinkAccount.scss";

export interface LinkAccountState {
    username: string;
    password: string;
    loading: boolean;
    redirect: boolean;
}

export interface LinkAccountDispatchProps {
    addAccount: typeof linkAccountActionCreator;
    showToast: typeof showToastAction;
}
export type LinkAccountProps = LinkAccountDispatchProps & RouteComponentProps<{}>;

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
                    />
                </div>
            </div>
        );
    }
    private onSubmit = throttle((username: string, password: string) => {
        if (!username && !password) {
            return;
        }

        this.setState({ loading: true });
        const data = { username, password };

        postAccount(data)
            .then((response: AxiosResponse<AccountData>) => {
                this.setState({
                    loading: false,
                    redirect: true,
                }, () => {
                    this.props.addAccount(response.data);
                    this.props.showToast(
                        `Successfully linked ${username}'s account`,
                        ToastType.Success,
                    );
                });
            })
            .catch(error => {
                this.setState({ loading: false });
                this.props.showToast(
                    getErrorMessage(error.response.status),
                    ToastType.Error,
                );
            });
    }, 1000, { leading: true, trailing: false });
}

const mapDispatchToProps = {
    addAccount: linkAccountActionCreator,
    showToast: showToastAction,
};

export const LinkAccountConnected = withRouter(connect<{}, LinkAccountDispatchProps>(
    undefined,
    mapDispatchToProps,
)(LinkAccount));
