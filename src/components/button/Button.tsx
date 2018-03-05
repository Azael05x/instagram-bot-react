import * as React from "react";
import * as styles from "./Button.scss";

export enum ButtonType {
    Main = "main",
    Danger = "danger",
    Warning = "warning",
}
export interface ButtonPropsDefaultProps {
    type: ButtonType;
}
export interface ButtonProps extends Partial<ButtonPropsDefaultProps> {
    label: string;
    onClick: () => void;
}

export class Button extends React.PureComponent<ButtonProps, {}> {
    public static defaultProps: ButtonPropsDefaultProps = {
        type: ButtonType.Main,
    };

    render() {
        const {
            label,
            onClick,
            type,
        } = this.props;

        const className = `${styles.button} ${styles[type]}`;

        return (
            <button
                className={className}
                onClick={onClick}
                data-role="button"
            >
                {label}
            </button>
        );
    }
}
