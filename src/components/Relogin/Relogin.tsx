import * as React from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";

import { relinkAccount, postAccountVerification } from "@utils/requests";
import { closePopupAction } from "@ducks/actions";
import { getStatusCodeMessage } from "@utils/getStatusCodeMessage";
import { StatusCode } from "@types";
import { isEnterKey, getPressedKey } from "@utils/keyboardEvents";
import { afterErrorSetState } from "@utils/functions";
import { successfulRelogin } from "@texts";

import { showToastAction } from "../toast/ducks/actions";
import { ToastType } from "../toast/ducks/type";
import { FormGroup } from "../user-form/components/FormGroup";
import { Button, ButtonType } from "../button/Button";
import { SpinnerSVG } from "../icons/Spinner";

import * as styles from "./Relogin.scss";

const SUBMIT_TIMEOUT = 500;

export interface ReloginOwnProps {
    username: string;
    id: number;
    isVerificationNeeded: boolean;
}
export interface ReloginDispatchProps {
    closePopup: typeof closePopupAction;
    showToast: typeof showToastAction;
}
export type ReloginProps = ReloginDispatchProps & ReloginOwnProps;

export interface ReloginState {
    password: string;
    code: string;
    errorCode: StatusCode;
    progress: boolean;
}

export class Relogin extends React.PureComponent<ReloginProps, ReloginState> {
    public state: ReloginState = {
        password: "",
        code: "",
        errorCode: undefined,
        progress: false,
    };

    public render() {
        return <>
            <div className={styles.container}>
                {this.renderTitle()}
                {this.renderForm()}
            </div>
            <div className={styles.buttonContainer}>
                {this.state.progress && (
                    <div className={styles.icon}>
                        <SpinnerSVG />
                    </div>
                )}
                <Button
                    label={"Submit"}
                    onClick={this.onSubmit}
                    type={ButtonType.Main}
                />
                <Button
                    label={"Later"}
                    onClick={this.props.closePopup}
                    type={ButtonType.Neutral}
                />
            </div>
        </>;
    }

    private renderTitle = () => {
        const instagramPasswordtitle = this.props.username
            ? (
                <>
                    Please enter&nbsp;
                    <span className={styles.accentedText}>@{this.props.username} Instagram password</span>
                    &nbsp;to&nbsp;continue
                </>
            ) : "Please enter this accounts Instagram password";
        return (
            <div style={{ marginBottom: ".5rem" }}>
                {
                    this.props.isVerificationNeeded
                    ? "Please input the verification code you received in your email"
                    : instagramPasswordtitle
                }
            </div>
        );
    }
    private renderForm = () => {
        const {
            isVerificationNeeded,
        } = this.props;
        const {
            code,
            password,
        } = this.state;

        return (
            <FormGroup
                htmlFor={isVerificationNeeded ?  "code" : "password"}
                label={isVerificationNeeded ? "Verification Code" : "Password"}
                autoFocus={true}
                value={isVerificationNeeded ? code : password}
                type={isVerificationNeeded ? "text" : "password"}
                onChange={isVerificationNeeded ? this.onCodeChange : this.onPasswordChange}
                onKeyUp={this.onKeyUp}
            />
        );
    }

    private onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            errorCode: undefined,
            password: event.currentTarget.value,
        });
    }
    private onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            errorCode: undefined,
            code: event.currentTarget.value,
        });
    }
    private onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const keyPressed = getPressedKey(event);
        if (keyPressed && isEnterKey(keyPressed)) {
            this.onSubmit();
        }
    }
    private onSubmit = debounce(async () => {
        if (!this.state.password && !this.state.code) {
            return;
        }

        this.setState({
            progress: true,
        });

        try {
            if (this.props.isVerificationNeeded && this.state.code) {
                await postAccountVerification(this.props.id, {
                    code: this.state.code,
                });
            } else {
                await relinkAccount(this.props.id, {
                    password: this.state.password,
                });
            }

            this.props.closePopup();
            this.props.showToast(
                successfulRelogin,
                ToastType.Success,
            );
            this.setState({
                progress: false,
                errorCode: undefined,
            });
        } catch (error) {
            const status = error.response && error.response.status;

            afterErrorSetState(status, () => {
                this.setState({
                    progress: false,
                    errorCode: status,
                });
            });
            this.props.showToast(
                // TODO: Handle error messages properly on the backend
                error.response.data || getStatusCodeMessage(status),
                ToastType.Error,
            );
        }
    }, SUBMIT_TIMEOUT, { trailing: false, leading: true});
}

const mapDispatchToProps: ReloginDispatchProps = {
    closePopup: closePopupAction,
    showToast: showToastAction,
};

export const ReloginConnected = connect<{}, ReloginDispatchProps>(
    undefined,
    mapDispatchToProps,
)(Relogin);
