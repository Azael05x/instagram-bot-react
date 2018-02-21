import * as React from "react";
import { connect } from "react-redux";
import * as styles from "./Toast.scss";

export enum ToastType {
    Info = "info",
    Error = "error",
}
export interface ToastItem {
    message: string;
    type?: ToastType;
}
export interface ToastStateProps {
    toast?: ToastItem;
}

export interface ToastState {
    showMessage: boolean;
}

export class Toast extends React.PureComponent<ToastStateProps, ToastState> {
    public state: ToastState = {
        showMessage: false,
    };
    public toastMessage: string = this.props.toast && this.props.toast.message;
    public componentDidUpdate() {
        if (this.props.toast) {
            this.toastMessage = this.props.toast.message;
            this.setState({
                showMessage: true,
            });
        } else {
            this.setState({
                showMessage: false,
            });
        }
    }
    public render() {
        if (!this.props.toast) {
            return null;
        }

        const className = `${styles.container}
            ${this.state.showMessage && styles.active}
            ${styles[this.props.toast.type]}
        `;

        return (
            <div className={className}>
               {this.toastMessage}
            </div>
        );
    }
}

const mapStateToProps = (_state: any) => ({
    toast: {
        message: "A toast message",
        type: ToastType.Info,
    },
});

export const ToastConnected = connect<ToastStateProps>(
    mapStateToProps,
)(Toast);
