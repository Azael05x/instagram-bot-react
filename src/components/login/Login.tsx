import * as React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";

import { ErrorCode } from "../error-message/types";
import { ErrorMessage } from "../error-message/ErrorMessage";
import { LOGIN_URL, ENTER_KEY } from "../../consts";
import { loginActionCreator } from "../../ducks/actions";

import * as styles from "./Login.css";

export interface LoginDispatchProps {
    onLogin: typeof loginActionCreator;
}

export type LoginProps = LoginDispatchProps & RouteComponentProps<{}>;

export interface LoginState {
    email: string;
    password: string;
    errorMessage: ErrorCode | undefined;
    redirect: boolean;
}
export enum FormInput {
    Email = "email",
    Password = "password",
}

export class Login extends React.Component<LoginProps, LoginState> {
    private titleFontSize: string = document.body.clientWidth < 900
        ? "calc(100vw / 10)"
        : "5em";
    public constructor(props: LoginProps) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorMessage: undefined,
            redirect: false,
        };
    }
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
        if (this.state.redirect) {
            return <Redirect exact to="/accounts" />;
        }

        return (
            <div className={styles.container}>
                <h1 style={{ fontSize: this.titleFontSize}} className={styles.title}>Welcome</h1>
                <div className={styles.form}>
                    <div className={styles.formGroup}>
                        <label
                            htmlFor="email"
                            className={styles.label}
                            hidden={!!this.state.email}
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            onChange={this.setEmail}
                            value={this.state.email}
                            className={styles.input}
                            data-role="email"
                            onKeyUp={this.onEnterKey}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label
                            htmlFor="password"
                            className={styles.label}
                            hidden={!!this.state.password}
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            onInput={this.setPassword}
                            value={this.state.password}
                            className={styles.input}
                            data-role="password"
                            onKeyUp={this.onEnterKey}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <button type="submit" className={styles.button} onClick={this.onSubmit}>Log In</button>
                    </div>
                </div>
                <hr />
                <ErrorMessage errorCode={this.state.errorMessage} />
            </div>
        );
    }
    private setEmail = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            email: event.currentTarget.value,
            errorMessage: undefined,
        });
    }
    private setPassword = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            password: event.currentTarget.value,
            errorMessage: undefined,
        });
    }
    private onSubmit = () => {
        if (!this.state.email && !this.state.password) {
            return;
        }

        axios.post(LOGIN_URL, {
            email: this.state.email,
            password: this.state.password,
        })
            .then((response) => {
                localStorage.setItem("auth_token", response.data.auth_token);
                localStorage.setItem("email", response.data.user.email);

                this.setState({
                    errorMessage: undefined,
                    redirect: true,
                }, () => {
                    this.props.onLogin({ email: this.state.email });
                });
            })
            .catch((error) => {
                this.setState({
                    errorMessage: `${error.response.status}` as ErrorCode,
                });
            });
    }
    private onEnterKey = (key: React.KeyboardEvent<HTMLInputElement>) => {
        if (key.keyCode === ENTER_KEY && this.state.email && this.state.password) {
            this.onSubmit();
        }
    }
}

const mapDispatchToProps: LoginDispatchProps = {
    onLogin: loginActionCreator,
};

export const LoginConnected = withRouter(connect<{}, LoginDispatchProps>(
    undefined,
    mapDispatchToProps,
)(Login));