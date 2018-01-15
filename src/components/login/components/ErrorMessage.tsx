import * as React from "react";
import * as styles from "./ErrorMessage.css";
import { getErrorMessage } from "../utils";
import { ErrorCode } from "../types";

export interface ErrorMessageProps {
    errorCode?: ErrorCode;
}

export class ErrorMessage extends React.PureComponent<ErrorMessageProps, {}> {
    render() {
        if (!this.props.errorCode) {
            return null;
        }

        return (
            <div className={styles.container}>
               {getErrorMessage(this.props.errorCode)}
            </div>
        );
    }
}
