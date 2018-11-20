import * as React from "react";
import { getPressedKey, isEnterKey } from "@utils/keyboardEvents";

import * as styles from "./Input.scss";
import { InputType } from "./utils";

export interface InputSelectState {
    value: string;
}
export interface InputSelectProps {
    placeholder: string;
    label?: string;
    dataId?: string;
    type?: string;
    onSubmit: () => void;
    onChange: (value: string) => void;
}
export class Input extends React.PureComponent<InputSelectProps, InputSelectState> {
    public static defaultProps = {
        type: InputType.Text,
    };
    public state: InputSelectState = {
        value: "",
    };

    public render() {
        const {
            placeholder,
            label,
            dataId,
            type,
        } = this.props;
        const {
            value,
        } = this.state;

        return (
            <span className={styles.container}>
                {label && <label>{label}</label>}
                <input
                    value={value}
                    onChange={this.onChange}
                    className={styles.input}
                    placeholder={placeholder}
                    onKeyUp={this.onEnterKey}
                    data-id={dataId}
                    type={type}
                />
            </span>
        );
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        this.setState({ value });
        this.props.onChange(value);
    }

    private onEnterKey = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const keyPressed = getPressedKey(event);
        /**
         * If more key presses have to be handled
         * then create universal keyHandler or use a lib
         */
        if (keyPressed && isEnterKey(keyPressed) && this.state.value) {
            this.props.onSubmit();
        }
    }
}
