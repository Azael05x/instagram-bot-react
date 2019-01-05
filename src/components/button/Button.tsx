import * as React from "react";
import * as styles from "./Button.scss";
import classnames from "classnames";

export enum ButtonType {
    Main = "main",
    Danger = "danger",
    Warning = "warning",
    Neutral = "neutral",
}
export enum ButtonSize {
    Regular = "regular",
    Small = "small",
}
export interface ButtonPropsDefaultProps {
    type: ButtonType;
    size: ButtonSize;
    disabled: boolean;
}
export interface ButtonProps extends Partial<ButtonPropsDefaultProps> {
    label: string;
    onClick: () => void;
}

export class Button extends React.PureComponent<ButtonProps> {
    public static defaultProps: ButtonPropsDefaultProps = {
        type: ButtonType.Main,
        size: ButtonSize.Regular,
        disabled: false,
    };

    render() {
        const {
            label,
            onClick,
            type,
            size,
            disabled,
        } = this.props;

        const className = classnames(
            styles.button,
            styles[type],
            styles[size],
            { [styles.disabled]: disabled }
        );

        return (
            <button
                className={className}
                onClick={onClick}
                data-role="button"
                disabled={disabled}
            >
                {label}
            </button>
        );
    }
}
