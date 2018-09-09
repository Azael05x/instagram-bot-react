import * as React from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";

import { relinkAccount, postAccountVerification } from "@utils/requests";
import { closePopupAction } from "@ducks/actions";
import { getStatusCodeMessage } from "@utils/getStatusCodeMessage";
import { StatusCode } from "@types";
import { isEnterKey, getPressedKey } from "@utils/keyboardEvents";

import { PopupButton, PopupButtonType } from "../popup/factory/PopupData";
import { showToastAction } from "../toast/ducks/actions";
import { ToastType } from "../toast/ducks/type";

import * as styles from "./Relogin.scss";
import { afterErrorSetState } from "@utils/functions";

const SUBMIT_TIMEOUT = 500;

export interface ReloginOwnProps {
    username: string;
    id: number;
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
    public componentDidMount() {
        window.addEventListener("keyup", this.onEnterKey);
    }
    public componentWillUnmount() {
        window.removeEventListener("keyup", this.onEnterKey);
    }
    public render() {
        const {
            username,
        } = this.props;

        const buttons: PopupButton[] =  [
            {
                id: PopupButtonType.Submit,
                title: "Submit",
                callback: this.onSubmit,
            },
            {
                id: PopupButtonType.Cancel,
                title: "Later",
                callback: this.props.closePopup,
            },
        ];

        return <>
            <div className={styles.container}>
                <div style={{ marginBottom: ".5rem" }}>
                    Oh no, this account has been logged out&nbsp;by&nbsp;Instagram. <br />
                    Please enter this accounts instagram&nbsp;password&nbsp;below
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        className={`${styles.input} ${this.state.errorCode && styles.inputError}`}
                        onChange={this.onPasswordChange}
                        autoFocus={true}
                        placeholder={`@${username} password`}
                    />
                    <input
                        type="text"
                        className={`${styles.input} ${this.state.errorCode && styles.inputError}`}
                        onChange={this.onCodeChange}
                        autoFocus={false}
                        placeholder={`Code if received`}
                    />
                    <div className={`${styles.icon} ${!this.state.progress && styles.hidden}`}>
                        <i className="fas fa-spinner" />
                    </div>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                {this.renderButtons(buttons)}
            </div>
        </>;
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
    private onEnterKey = (event: KeyboardEvent) => {
        const keyPressed = getPressedKey(event);
        if (keyPressed && isEnterKey(keyPressed)) {
            this.onSubmit();
        }
    }
    private onSubmit = debounce(async () => {
        if (!this.state.password) {
            return;
        }

        this.setState({
            progress: true,
        });

        try {
            if (this.state.code) {
                await postAccountVerification({
                    username: this.props.username,
                    password: this.state.password,
                    code: this.state.code,
                });
            } else {
                await relinkAccount(this.props.id, {
                    password: this.state.password,
                });
            }

            this.props.closePopup();
            this.props.showToast(
                "You have succesfully re-logged in!",
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
                getStatusCodeMessage(status),
                ToastType.Error,
            );
        }
    }, SUBMIT_TIMEOUT, { trailing: false, leading: true});
    private renderButtons = (buttons: PopupButton[]) => {
        /**
         * @deprecated
         * replace with Button component
         * add disabled style to button component
         */
        return buttons.map((button, i) => {
            return (
                <button
                    key={i}
                    data-role={button.id}
                    onClick={button.callback}
                    className={`${styles.button} ${styles[button.id]}`}
                >
                    {button.icon}
                    {button.icon && " "}
                    {button.title}
                </button>
            );
        });
    }
}

const mapDispatchToProps: ReloginDispatchProps = {
    closePopup: closePopupAction,
    showToast: showToastAction,
};

export const ReloginConnected = connect<{}, ReloginDispatchProps>(
    undefined,
    mapDispatchToProps,
)(Relogin);
