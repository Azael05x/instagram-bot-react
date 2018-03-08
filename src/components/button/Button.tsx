import * as React from "react";
import * as styles from "./Button.scss";

export enum ButtonType {
    Main = "main",
    Danger = "danger",
    Warning = "warning",
}
export enum ButtonSize {
    Regular = "regular",
    Small = "small",
}
export interface ButtonPropsDefaultProps {
    type: ButtonType;
    size: ButtonSize;
}
export interface ButtonProps extends Partial<ButtonPropsDefaultProps> {
    label: string;
    onClick: () => void;
}

export class Button extends React.PureComponent<ButtonProps, {}> {
    public static defaultProps: ButtonPropsDefaultProps = {
        type: ButtonType.Main,
        size: ButtonSize.Regular,
    };

    render() {
        const {
            label,
            onClick,
            type,
            size,
        } = this.props;

        const className = `${styles.button} ${styles[type]} ${styles[size]}`;

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
