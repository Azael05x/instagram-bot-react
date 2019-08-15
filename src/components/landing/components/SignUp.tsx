import * as React from "react";
import { connect } from "react-redux";
import debounce from "lodash.debounce";

import { afterErrorSetState } from "@utils/functions";
import { registerUser } from "@utils/requests";
import { Path } from "@types";
import { ButtonType } from "../../button/Button";
import { showToastAction } from "../../toast/ducks/actions";
import { ToastType } from "../../toast/ducks/type";
import { UserForm } from "../../user-form/UserForm";

const SUBMIT_TIMEOUT = 500;
/**
 * Used to pass into <Info />  component.
 */
const infoData = [{
    infoPathTo: Path.Login,
    infoText: "Already have an account?",
    linkLabel: "Log in here!",
}];

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
                infoData={infoData}
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
                "Successfully Signed up!",
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
                errorText,
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
