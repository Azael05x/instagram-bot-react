import * as React from "react";
import { connect } from "react-redux";

import { relinkAccount } from "../../utils/requests";
import { ENTER_KEY } from "../../consts";
import { closePopupActionCreator } from "../../ducks/actions";
import { ErrorMessage, ErrorMessageType } from "../error-message/ErrorMessage";
import { ErrorCode } from "../error-message/types";

import * as styles from "./Relogin.scss";

export interface ReloginOwnProps {
    username: string;
    id: number;
}
export interface ReloginDispatchProps {
    closePopup: typeof closePopupActionCreator;
}
export type ReloginProps = ReloginDispatchProps & ReloginOwnProps;

export interface ReloginState {
    password: string;
    errorCode: ErrorCode;
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
        return (
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
                        {`@${this.props.username} password`}
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
                <ErrorMessage theme={ErrorMessageType.Top} errorCode={this.state.errorCode} />
            </div>
        );
    }
    private onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            errorCode: undefined,
            password: event.currentTarget.value,
        });
    }
    private onEnterKey = (event: KeyboardEvent) => {
        if (event.keyCode === ENTER_KEY) {
            this.setState({
                progress: true,
            });
            relinkAccount(this.props.id, {
                password: this.state.password,
            })
            .then(_response => {
                this.props.closePopup();
                this.setState({
                    progress: false,
                    errorCode: undefined,
                });
            })
            .catch(error => {
                this.setState({
                    progress: false,
                    errorCode: error.response.status,
                });
            });
        }
    }
}

const mapDispatchToProps: ReloginDispatchProps = {
    closePopup: closePopupActionCreator,
};

export const ReloginConnected = connect<{}, ReloginDispatchProps>(
    undefined,
    mapDispatchToProps,
)(Relogin);
