import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { postChangePassword, postChangePasswordViaLink } from "@utils/requests";
import { Path } from "@types";

import { Button, ButtonType, ButtonSize } from "../../button/Button";
import { InputType } from "../../input/utils";
import { showToastAction } from "../../toast/ducks/actions";
import { ToastType } from "../../toast/ducks/type";
import { Input } from "../../input/Input";

import * as styles from "../User.scss";

export interface ChangePasswordDispatchProps {
    showToast: typeof showToastAction;
}
export interface ChangePasswordOwnProps {
    isChangeViaEmail?: boolean;
}
export type ChangePasswordProps = ChangePasswordDispatchProps & ChangePasswordOwnProps;
export interface ChangePasswordState {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
    redirect: boolean;
}

export class ChangePassword extends React.Component<ChangePasswordProps, ChangePasswordState> {
    public state: ChangePasswordState = {
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
        redirect: false,
    };

    public render() {
        if (this.state.redirect) {
            return <Redirect to={Path.Login} />;
        }

        return (
            <div className={styles.sectionWrapper}>
                <h3>Change password</h3>
                <div className={styles.section}>
                {!this.props.isChangeViaEmail && (
                    <Input
                        placeholder={"Accounts old password"}
                        onSubmit={this.onSubmit}
                        label={"Old password"}
                        type={InputType.Password}
                        onChange={this.onChangeOldPassword}
                    />
                )}
                    <Input
                        placeholder={"Accounts new password"}
                        onSubmit={this.onSubmit}
                        label={"New password"}
                        type={InputType.Password}
                        onChange={this.onChangeNewPassword}
                    />
                    <Input
                        placeholder={"Confirm accounts new password"}
                        onSubmit={this.onSubmit}
                        label={"Confirm password"}
                        type={InputType.Password}
                        onChange={this.onChangeNewPasswordConfirm}
                    />
                </div>
                <Button
                    onClick={this.onSubmit}
                    label={"Yes, change my password"}
                    type={ButtonType.Danger}
                    size={ButtonSize.Small}
                />
            </div>
        );
    }

    private onChangeOldPassword = (value: string) => {
        this.setState({ oldPassword: value });
    }
    private onChangeNewPassword = (value: string) => {
        this.setState({ newPassword: value });
    }
    private onChangeNewPasswordConfirm = (value: string) => {
        this.setState({ newPasswordConfirm: value });
    }
    private onSubmit = async () => {
        const {
            oldPassword,
            newPassword,
            newPasswordConfirm,
        } = this.state;

        if (newPassword !== newPasswordConfirm) {
            this.props.showToast(
                "New passwords don't match",
                ToastType.Error,
            );
            return;
        }

        if (this.props.isChangeViaEmail) {
            await postChangePasswordViaLink({ newPassword });
        } else {
            if (oldPassword === newPassword) {
                this.props.showToast(
                    "Password didn't change",
                    ToastType.Error,
                );
                return;
            }

            await postChangePassword({
                newPassword,
                oldPassword,
            });
        }

        this.setState({ redirect: true });
        this.props.showToast(
            "Successfully changed user password",
            ToastType.Success,
        );
    }
}

const mapDispatchToProps: ChangePasswordDispatchProps = {
    showToast: showToastAction,
};

export const ChangePasswordConnected = connect<{}, ChangePasswordDispatchProps>(
    null,
    mapDispatchToProps,
)(ChangePassword);
