import * as React from "react";
import * as styles from "./ErrorMessage.scss";
import { getErrorMessage } from "./utils";
import { ErrorCode } from "./types";

export enum ErrorMessageType {
    Regular,
    Top,
}

export interface ErrorMessageProps {
    errorCode?: ErrorCode;
    theme?: ErrorMessageType;
}
export interface ErrorMessageState {
    showError: boolean;
}

const className = {
    [ErrorMessageType.Regular]: styles.container,
    [ErrorMessageType.Top]: styles.containerTop,
};

export class ErrorMessage extends React.PureComponent<ErrorMessageProps, ErrorMessageState> {
    public static defaultProps = {
        theme: ErrorMessageType.Regular,
    };
    public state: ErrorMessageState = {
        showError: false,
    };
    public errorMessage: string = getErrorMessage(this.props.errorCode);
    public componentDidUpdate() {
        if (this.props.errorCode) {
            this.errorMessage = getErrorMessage(this.props.errorCode);
            this.setState({
                showError: true,
            });
        } else {
            this.setState({
                showError: false,
            });
        }
    }
    public render() {
        const {
            theme,
        } = this.props;

        return (
            <div className={`${className[theme]} ${this.state.showError && styles.active}`}>
               {this.errorMessage}
            </div>
        );
    }
}
