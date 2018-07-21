import * as React from "react";
import { connect } from "react-redux";
import axios, { AxiosError } from "axios";
import { throttle } from "lodash";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";

import { LOGIN_URL } from "@consts";
import { loginActionCreator } from "@ducks/actions";
import { UserForm } from "../user-form/UserForm";
import { ButtonType } from "../button/Button";
import { showToastAction } from "../toast/ducks/actions";
import { ToastType } from "../toast/ducks/state";
import { StatusCode } from "@types";
import { getStatusCodeMessage } from "@utils/getStatusCodeMessage";

import * as styles from "./Login.scss";

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
                    redirectEndpoint={"/accounts"}
                    onSubmit={this.onSubmit}
                    buttonLabel={"Log In"}
                />
                <hr />
                <small>
                    Don't have an account?
                    {" "}
                    <Link to={"/register"} className={styles.link}>Sign up here!</Link>
                </small>
            </div>
        );
    }
    private onSubmit = throttle((email: string, password: string) => {
        if (!email && !password) {
            return;
        }

        this.setState({
            loading: true,
        });

        axios.post(LOGIN_URL, {
            email,
            password,
        }, { withCredentials: true })
            .then((response) => {
                localStorage.setItem("email", response.data.user.email);

                this.setState({
                    redirect: true,
                    loading: false,
                }, () => {
                    this.props.showToast(
                        <h3>Welcome, {response.data.user.email}!</h3>,
                        ToastType.Success,
                    );
                    this.props.onLogin({ email });
                });
            })
            .catch((error: AxiosError) => {
                this.setState({ loading: false });
                this.props.showToast(
                    getStatusCodeMessage(error.response.status),
                    ToastType.Error,
                );
            });
    }, 1000, { leading: true, trailing: false });
}

const mapDispatchToProps: LoginDispatchProps = {
    onLogin: loginActionCreator,
    showToast: showToastAction,
};

export const LoginConnected = withRouter(connect<{}, LoginDispatchProps>(
    undefined,
    mapDispatchToProps,
)(Login));
