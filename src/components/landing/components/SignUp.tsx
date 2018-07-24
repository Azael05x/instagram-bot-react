import * as React from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";

import { ButtonType } from "../../button/Button";
import { registerUser } from "@utils/requests";
import { showToastAction } from "../../toast/ducks/actions";
import { ToastType } from "../../toast/ducks/state";
import { UserForm } from "../../user-form/UserForm";
import { afterErrorSetState } from "@utils/functions";

const SUBMIT_TIMEOUT = 500;

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

    private onSubmit = debounce(async (email: string, password: string) => {
        if (!email && !password) {
            return;
        }

        this.setState({
            loading: true,
        });

        try {
            await registerUser({ email, password });

            this.props.showToast(
                <h3>Successfully Signed up!</h3>,
                ToastType.Success,
            );

            // Redirect to sign up page
            this.setState({
                redirect: true,
                loading: false,
            });
        } catch (error) {
            afterErrorSetState(error.response.status, () => {
                this.setState({
                    loading: false,
                });
            });

            console.error("An error occurred: ", error);
            const errorText = error.response
                ? error.response.data
                : "Oops, something went wrong. Please try again later";
            this.props.showToast(
                <h4>{errorText}</h4>,
                ToastType.Error,
            );
        }
    }, SUBMIT_TIMEOUT, { leading: true, trailing: false });
}

const mapDispatchToProps: SignUpDispatchProps = {
    showToast: showToastAction,
};

export const SignUpConnected = connect<{}, SignUpDispatchProps>(
    undefined,
    mapDispatchToProps,
)(SignUp);
