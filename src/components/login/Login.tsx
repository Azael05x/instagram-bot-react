import * as React from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import {
    RouteComponentProps,
    withRouter,
} from "react-router-dom";

import { loginActionCreator } from "@ducks/actions";
import { login } from "@utils/requests";
import { StatusCode, Path } from "@types";
import { afterErrorSetState } from "@utils/functions";

import { UserForm } from "../user-form/UserForm";
import { ButtonType } from "../button/Button";
import { showToastAction } from "../toast/ducks/actions";
import { ToastType } from "../toast/ducks/type";
import { FluidTitle } from "../fluid-title/FluidTitle";

import * as styles from "./Login.scss";

const SUBMIT_TIMEOUT = 500;

export interface LoginDispatchProps {
    onLogin: typeof loginActionCreator;
    showToast: typeof showToastAction;
}

export type LoginProps = LoginDispatchProps & RouteComponentProps<{}>;

export interface LoginState {
    errorCode?: StatusCode;
    redirect: boolean;
    loading: boolean;
}
export enum FormInput {
    Email = "email",
    Password = "password",
}

/**
 * Used to pass into <Info />  component.
 */
const infoData = [
    {
        infoPathTo: Path.Register,
        infoText: "Don't have an account?",
        linkLabel: "Sign up here!",
    },
    {
        infoPathTo: Path.ResetPassword,
        infoText: "Forgot password",
        linkLabel: "Renew here!",
    },
];

export class Login extends React.Component<LoginProps, LoginState> {
    public state: LoginState = {
        errorCode: undefined,
        redirect: false,
        loading: false,
    };

    public render() {
        return (
            <div className={styles.container}>
                <FluidTitle title={"Welcome"} />
                <UserForm
                    actionInProgress={this.state.loading}
                    buttonType={ButtonType.Main}
                    redirect={this.state.redirect}
                    redirectEndpoint={Path.Dashboard}
                    onSubmit={this.onSubmit}
                    buttonLabel={"Log In"}
                    infoData={infoData}
                />
            </div>
        );
    }
    private onSubmit = debounce(async (email: string, password: string) => {
        if (!email && !password) {
            return;
        }

        this.setState({
            loading: true,
        });

        try {
            const response = await login({ email, password });

            localStorage.setItem("email", response.data.user.email);

            this.setState({
                redirect: true,
                loading: false,
            }, () => {
                this.props.showToast(
                    {
                        top: "Welcome,",
                        bottom: response.data.user.email,
                    },
                    ToastType.Success,
                );
                this.props.onLogin({ email });
            });
        } catch (error) {
            afterErrorSetState(error.response.status, () => {
                this.setState({ loading: false });
            });

            this.props.showToast(
                error.response.data,
                ToastType.Error,
            );
        }
    }, SUBMIT_TIMEOUT, { leading: true, trailing: false });
}

const mapDispatchToProps: LoginDispatchProps = {
    onLogin: loginActionCreator,
    showToast: showToastAction,
};

export const LoginConnected = withRouter(connect<{}, LoginDispatchProps>(
    undefined,
    mapDispatchToProps,
)(Login));

export default LoginConnected;
