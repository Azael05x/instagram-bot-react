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
const infoData = {
    infoPathTo: Path.Register,
    infoText: "Don't have an account?",
    linkLabel: "Sign up here!",
};

export class Login extends React.Component<LoginProps, LoginState> {
    private titleFontSize: string = document.body.clientWidth < 900
        ? "calc(100vw / 10)"
        : "5em";
    public state: LoginState = {
        errorCode: undefined,
        redirect: false,
        loading: false,
    };
    public componentDidMount() {
        window.addEventListener("resize", this.onResize);
    }
    public componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }
    private onResize = () => {
        const oldFontSize = this.titleFontSize;
        this.titleFontSize = document.body.clientWidth < 900 ? "calc(100vw / 10)" : "5em";
        if (oldFontSize !== this.titleFontSize) {
            this.forceUpdate();
        }
    }
    public render() {
        return (
            <div className={styles.container}>
                <h1 style={{ fontSize: this.titleFontSize}} className={styles.title}>Welcome</h1>
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
