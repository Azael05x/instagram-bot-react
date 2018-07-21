import * as React from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { AxiosError } from "axios";

import { relinkAccount } from "@utils/requests";
import { closePopupActionCreator } from "@ducks/actions";
import { getStatusCodeMessage } from "@utils/getStatusCodeMessage";
import { StatusCode } from "@types";
import { isEnterKey, getPressedKey } from "@utils/keyboardEvents";

import { PopupButton, PopupButtonType } from "../popup/factory/PopupData";
import { showToastAction } from "../toast/ducks/actions";
import { ToastType } from "../toast/ducks/state";

import * as styles from "./Relogin.scss";

const searchThrottleTimeout = 1000;

export interface ReloginOwnProps {
    username: string;
    id: number;
}
export interface ReloginDispatchProps {
    closePopup: typeof closePopupActionCreator;
    showToast: typeof showToastAction;
}
export type ReloginProps = ReloginDispatchProps & ReloginOwnProps;

export interface ReloginState {
    password: string;
    errorCode: StatusCode;
    progress: boolean;
}

export class Relogin extends React.PureComponent<ReloginProps, ReloginState> {
    public state: ReloginState = {
        password: "",
        errorCode: undefined,
        progress: false,
    };
    public componentWillMount() {
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
                    <label
                        htmlFor="password"
                        className={styles.label}
                        hidden={!!this.state.password}
                    >
                        {`@${username} password`}
                    </label>
                    <input
                        id="password"
                        type="password"
                        className={`${styles.input} ${this.state.errorCode && styles.inputError}`}
                        onChange={this.onPasswordChange}
                        autoFocus={true}
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
    private onEnterKey = (event: KeyboardEvent) => {
        const keyPressed = getPressedKey(event);
        /**
         * If more key presses have to be handled
         * then create universal keyHandler or use a lib
         */
        if (keyPressed && isEnterKey(keyPressed)) {
            this.onSubmit();
        }
    }
    private onSubmit = debounce(() => {
        if (!this.state.password) {
            return;
        }

        this.setState({
            progress: true,
        });

        relinkAccount(this.props.id, {
            password: this.state.password,
        })
        .then(_response => {
            this.props.closePopup();
            this.props.showToast(
                "You have succesfully re-logged in!",
                ToastType.Success,
            );
            this.setState({
                progress: false,
                errorCode: undefined,
            });
        })
        .catch((error: AxiosError) => {
            console.error("An error occurred while attempting a re-login: " + error);
            this.setState({
                progress: false,
                errorCode: error.response.status,
            });
            this.props.showToast(
                getStatusCodeMessage(error.response.status),
                ToastType.Error,
            );
        });
    }, searchThrottleTimeout, { trailing: false, leading: true});
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
    closePopup: closePopupActionCreator,
    showToast: showToastAction,
};

export const ReloginConnected = connect<{}, ReloginDispatchProps>(
    undefined,
    mapDispatchToProps,
)(Relogin);
