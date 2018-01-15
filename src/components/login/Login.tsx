import * as React from "react";
import { FormEvent } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { ErrorCode } from "./types";
import { ErrorMessage } from "./components/ErrorMessage";
import { LOGIN_URL } from "../../consts";
import { loginActionCreator } from "../../ducks/common";

import * as styles from "./Login.css";
import { withRouter } from "react-router-dom";

const data: { email: string, password: string } = {
    email: "",
    password: "",
};

export interface LoginDispatchProps {
    onLogin: typeof loginActionCreator;
}

export type LoginProps = LoginDispatchProps;

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

export class Login extends React.PureComponent<LoginProps, LoginState> {
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
        }
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
            return <Redirect exact to="/" />
        }

        return (
            <div className={styles.container}>
                <h1 style={{ fontSize: this.titleFontSize}} className={styles.title}>Welcome</h1>
                <form
                    className={styles.form}
                    onSubmit={this.onSubmit}
                >
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
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <button type="submit" className={styles.button}>Log In</button>
                    </div>
                </form>
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
    private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        for (let i = 0; i < event.currentTarget.elements.length; i++) {
            const element = event.currentTarget.elements[i] as HTMLInputElement;
            const elementDataRole = element.attributes.getNamedItem("data-role");

            if (elementDataRole) {
                const dataRole = element.attributes.getNamedItem("data-role").value;

                switch(dataRole) {
                    case FormInput.Email: {
                        data.email = element.value;
                        break;
                    }
                    case FormInput.Password: {
                        data.password = element.value
                        break;
                    }
                    default:
                }
            }
        }


        axios.post(LOGIN_URL, data)
            .then((response) => {
                this.setState({
                    errorMessage: undefined,
                    redirect: true,
                });

                if (!localStorage.getItem("auth_token")) {
                    localStorage.setItem("auth_token", response.data.auth_token);
                    localStorage.setItem("email", response.data.user.email);
                }

               this.props.onLogin({ email: data.email });
            })
            .catch((error) => {
                this.setState({
                    errorMessage: `${error.response.status}` as ErrorCode,
                });
            });
    }
}

const mapDispatchToProps: LoginDispatchProps = {
    onLogin: loginActionCreator,
}

export const LoginConnected = withRouter(connect<{}, LoginDispatchProps>(
    undefined,
    mapDispatchToProps,
)(Login) as any); // TODO: Add React Router extend props
