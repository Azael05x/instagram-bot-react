import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AxiosResponse } from "axios";

import { Button, ButtonType } from "../../button/Button";
import { ENTER_KEY } from "../../../consts";
import { registerUser } from "../../../utils/requests";
import { showToastAction } from "../../toast/ducks/actions";
import { ToastType } from "../../toast/ducks/state";

import * as styles from "../Landing.scss";

export interface SignUpState {
    email: string;
    password: string;
    registerInProgress: boolean;
    redirect: boolean;
}

export interface SignUpDispatchProps {
    showToast: typeof showToastAction;
}
export type SignUpProps = SignUpDispatchProps;

export class SignUp extends React.PureComponent<SignUpProps, SignUpState> {
    public state: SignUpState = {
        email: "",
        password: "",
        registerInProgress: false,
        redirect: false,
    };
    public render() {
        if (this.state.redirect) {
            return <Redirect exact to="/login" />;
        }

        return (
            <div className={styles.formGroupContainer}>
                <div className={styles.formGroup}>
                    <label
                        htmlFor="email"
                        className={`${ this.state.email && styles.hidden} ${styles.label}`}
                    >
                        Your email...
                    </label>
                    <input
                        id="email"
                        className={styles.input}
                        type="email"
                        onChange={this.onEmailChange}
                        value={this.state.email}
                        autoComplete="nope"
                        autoCapitalize="nope"
                        autoCorrect="nope"
                        onKeyUp={this.onEnterKey}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label
                        htmlFor="password"
                        className={`${ this.state.password && styles.hidden} ${styles.label}`}
                    >
                        Password...
                    </label>
                    <input
                        id="password"
                        className={styles.input}
                        type="password"
                        onChange={this.onPasswordChange}
                        value={this.state.password}
                        autoComplete="nope"
                        autoCapitalize="nope"
                        autoCorrect="nope"
                        onKeyUp={this.onEnterKey}
                    />
                </div>
                <div className={styles.formGroup}>
                    <div className={`${styles.spinner} ${!this.state.registerInProgress && styles.hidden}`}>
                        <i className="fas fa-spinner" />
                    </div>
                    <Button
                        label={"Sign Up"}
                        onClick={this.onSubmit}
                        type={ButtonType.Danger}
                    />
                </div>
            </div>
        );
    }
    private onEmailChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        this.setState({
            email: event.currentTarget.value,
        });
    }
    private onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        this.setState({
            password: event.currentTarget.value,
        });
    }
    private onEnterKey = (key: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (key.keyCode === ENTER_KEY && this.state.email && this.state.password) {
            this.onSubmit();
        }
    }
    private onSubmit = async () => {
        this.toggleRegisterInProgress();

        registerUser({ email: this.state.email, password: this.state.password })
            .then((response: AxiosResponse<{ success: boolean, errors: { email: string[] } }>) => {
                this.toggleRegisterInProgress();

                if (response.data.success) {
                    this.props.showToast(
                        <h3>Successfully Signed up!</h3>,
                        ToastType.Success,
                    );

                    // Redirect to sign up page
                    this.setState({
                        redirect: true,
                    });
                } else {
                    this.props.showToast(
                        <h4>Email {response.data.errors.email}</h4>,
                        ToastType.Error,
                    );
                }
            })
            .catch((error) => {
                this.toggleRegisterInProgress();

                console.error("An error occurred: ", error);
                this.props.showToast(
                    <h4>Oops, something went wrong. Please try again later</h4>,
                    ToastType.Error,
                );
            });
    }
    private toggleRegisterInProgress = () => {
        this.setState({
            registerInProgress: !this.state.registerInProgress,
        });
    }
}

const mapDispatchToProps: SignUpDispatchProps = {
    showToast: showToastAction,
};

export const SignUpConnected = connect<{}, SignUpDispatchProps>(
    undefined,
    mapDispatchToProps,
)(SignUp);
