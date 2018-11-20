import * as React from "react";
import { postChangePassword } from "@utils/requests";

import { Input } from "../../input/Input";
import { Button, ButtonType, ButtonSize } from "../../button/Button";
import { InputType } from "../../input/utils";
import { showToastAction } from "../../toast/ducks/actions";
import { ToastType } from "../../toast/ducks/type";

import * as styles from "../User.scss";

export interface ChangePasswordProps {
    afterOperationCallback: typeof showToastAction;
}
export interface ChangePasswordState {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}

export class ChangePassword extends React.Component<ChangePasswordProps, ChangePasswordState> {
    public static state: ChangePasswordState = {
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
    };

    public render() {
        return (
            <div className={styles.sectionWrapper}>
                <h3>Change password</h3>
                <div className={styles.section}>
                    <div className={styles.oldPassword}>
                        <Input
                            placeholder={"Accounts old password"}
                            onSubmit={this.onSubmit}
                            label={"Old password"}
                            type={InputType.Password}
                            onChange={this.onChangeOldPassword}
                        />
                    </div>
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

        if (oldPassword === newPassword) {
            this.props.afterOperationCallback(
                "Password didn't change",
                ToastType.Error,
            );
            return;
        }
        if (newPassword !== newPasswordConfirm) {
            this.props.afterOperationCallback(
                "New passwords don't match",
                ToastType.Error,
            );
            return;
        }

        await postChangePassword({
            newPassword,
            oldPassword,
        });
        this.props.afterOperationCallback(
            "Successfully changed user password",
            ToastType.Success,
        );
    }
}
