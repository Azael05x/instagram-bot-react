import * as React from "react";
import { connect } from "react-redux";
import { AxiosError } from "axios";
import { throttle } from "lodash";

import { ButtonType } from "../../button/Button";
import { registerUser } from "@utils/requests";
import { showToastAction } from "../../toast/ducks/actions";
import { ToastType } from "../../toast/ducks/state";
import { UserForm } from "../../user-form/UserForm";

export interface SignUpState {
    email: string;
    password: string;
    loading: boolean;
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
        loading: false,
        redirect: false,
    };
    public render() {
        return (
            <UserForm
                actionInProgress={this.state.loading}
                buttonType={ButtonType.Danger}
                redirect={this.state.redirect}
                redirectEndpoint={"/login"}
                onSubmit={this.onSubmit}
                buttonLabel={"Sign Up"}
            />
        );
    }
    /*
        Throttling onSubmit because
        the initial idea of throttling a Promise (e.g. registerUser)
        immediately calls the then/catch chain, however,
        the call itself is throttled.

        This is an unexpected behaviour.
    */
    private onSubmit = throttle((email: string, password: string) => {
        if (!email && !password) {
            return;
        }

        this.setState({
            loading: true,
        });

        registerUser({ email, password })
            .then(() => {
                this.props.showToast(
                    <h3>Successfully Signed up!</h3>,
                    ToastType.Success,
                );

                // Redirect to sign up page
                this.setState({
                    redirect: true,
                    loading: false,
                });
            })
            .catch((error: AxiosError) => {
                this.setState({
                    loading: false,
                });

                console.error("An error occurred: ", error);
                const errorText = error.response
                    ? error.response.data
                    : "Oops, something went wrong. Please try again later";
                this.props.showToast(
                    <h4>{errorText}</h4>,
                    ToastType.Error,
                );
            });
    }, 1000, { leading: true, trailing: false });
}

const mapDispatchToProps: SignUpDispatchProps = {
    showToast: showToastAction,
};

export const SignUpConnected = connect<{}, SignUpDispatchProps>(
    undefined,
    mapDispatchToProps,
)(SignUp);
