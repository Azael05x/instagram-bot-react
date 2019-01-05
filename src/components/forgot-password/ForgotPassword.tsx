import * as React from "react";
import * as styles from "./ForgotPassword.scss";
import { Divider, DividerTheme } from "../divider/Divider";
import { getPressedKey, isEnterKey } from "@utils/keyboardEvents";
import { FormGroup } from "../user-form/components/FormGroup";
import { Button, ButtonSize } from "../button/Button";
import { postResetPassword } from "@utils/requests";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { showToastAction } from "../toast/ducks/actions";
import { ToastType } from "../toast/ducks/type";
import { debouncedCb } from "@utils/debouncedCb";

export interface ForgotPasswordDispatchProps {
    showToast: typeof showToastAction;
}

export type ForgotPasswordProps = ForgotPasswordDispatchProps & RouteComponentProps<{}>;

export class ForgotPassword extends React.PureComponent<ForgotPasswordProps> {
    public state = {
        email: "",
        actionInProgress: false,
    };

    render() {
        const {
            email,
            actionInProgress,
        } = this.state;

        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h2>Trouble Logging In?</h2>
                    <Divider theme={DividerTheme.Small} />
                    <small>
                        Enter your email and we'll
                        send you a link to get back into your account.
                    </small>
                    <form
                        className={styles.formGroupContainer}
                        onSubmit={this.onSubmit}
                        noValidate={true}
                    >
                        <FormGroup
                            htmlFor={"email"}
                            onChange={this.onMainFieldChange}
                            onKeyUp={this.onKeyUp}
                            value={email}
                            label={"Email"}
                            type={"email"}
                        />
                        <div className={styles.formGroup}>
                            <Button
                                label={"Send Login Link"}
                                onClick={this.onSubmit}
                                size={ButtonSize.Small}
                                disabled={actionInProgress}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    private onMainFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: event.currentTarget.value,
        });
    }
    private onKeyUp = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
         const keyPressed = getPressedKey(event);
        /**
         * If more key presses have to be handled
         * then create universal keyHandler or use a lib
         */
        if (keyPressed && isEnterKey(keyPressed) && this.state.email) {
            this.onSubmit();
        }
    }
    private onSubmit = debouncedCb({
        cb: async () => {
            const {
                actionInProgress,
                email,
            } = this.state;

            if (actionInProgress || !email) {
                return;
            }

            this.setState({
                actionInProgress: true,
            });

            try {
                await postResetPassword(email);
                this.props.showToast(
                    "A password reset link with instructions has been sent to your email",
                    ToastType.Success,
                );

            } catch (error) {
                this.props.showToast(
                    "Please check if the email is correct",
                    ToastType.Error,
                );
            } finally {
                setTimeout(() => {
                    this.setState({
                        actionInProgress: false,
                    });
                }, 500);
            }
        },
    });
}

const mapDispatchToProps: ForgotPasswordDispatchProps = {
    showToast: showToastAction,
};

export const ForgotPasswordConnected = withRouter(connect<{}, ForgotPasswordDispatchProps>(
    undefined,
    mapDispatchToProps,
)(ForgotPassword));

export default ForgotPasswordConnected;
