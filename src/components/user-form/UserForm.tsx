import * as React from "react";
import { Redirect } from "react-router-dom";

import { Button, ButtonType } from "../button/Button";
import { getPressedKey, isEnterKey } from "@utils/keyboardEvents";

import * as styles from "./UserForm.scss";

const onFormSubmitCb = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

export interface UserFormState {
    value: string;
    password: string;
}

export enum InputType {
    Email = "email",
    Text = "text",
    Number = "number",
    Telephone = "tel",
}
const labelTextMap = {
    [InputType.Email]: "email",
    [InputType.Text]: "text",
    [InputType.Number]: "number",
    [InputType.Telephone]: "telephone",
};

export interface UserFormProps {
    onSubmit: (email: string, password: string) => void;
    actionInProgress: boolean;
    redirect: boolean;
    redirectEndpoint: string;
    buttonLabel: string;
    mainInputLabel?: string;
    buttonType?: ButtonType;
    inputType?: InputType;
}

export class UserForm extends React.PureComponent<UserFormProps, UserFormState> {
    public static defaultProps = {
        inputType: InputType.Email,
    };
    public state: UserFormState = {
        value: "",
        password: "",
    };
    public render() {
        if (this.props.redirect) {
            return <Redirect exact to={this.props.redirectEndpoint} />;
        }

        return (
            <form className={styles.formGroupContainer} onSubmit={onFormSubmitCb} noValidate={true}>
                <div className={styles.formGroup}>
                    <label
                        htmlFor={this.props.inputType}
                        className={`${ this.state.value && styles.hidden} ${styles.label}`}
                    >
                        {this.props.mainInputLabel || labelTextMap[this.props.inputType]}
                    </label>
                    <input
                        id={this.props.inputType}
                        className={styles.input}
                        type={this.props.inputType}
                        onChange={this.onEmailChange}
                        value={this.state.value}
                        autoComplete="nope"
                        autoCapitalize="nope"
                        autoCorrect="nope"
                        onKeyUp={this.onEnterKey}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label
                        htmlFor="password"
                        className={`${ this.state.password && styles.hidden} ${styles.label}`}
                    >
                        password
                    </label>
                    <input
                        id="password"
                        className={styles.input}
                        type="password"
                        onChange={this.onPasswordChange}
                        value={this.state.password}
                        autoComplete="nope"
                        autoCapitalize="nope"
                        autoCorrect="nope"
                        onKeyUp={this.onEnterKey}
                    />
                </div>
                <div className={styles.formGroup}>
                    <div className={`${styles.spinner} ${!this.props.actionInProgress && styles.hidden}`}>
                        <i className="fas fa-spinner" />
                    </div>
                    <Button
                        label={this.props.buttonLabel}
                        onClick={this.onSubmit}
                        type={this.props.buttonType}
                    />
                </div>
            </form>
        );
    }
    private onEmailChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        this.setState({
            value: event.currentTarget.value,
        });
    }
    private onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        this.setState({
            password: event.currentTarget.value,
        });
    }
    private onEnterKey = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
         const keyPressed = getPressedKey(event);
        /**
         * If more key presses have to be handled
         * then create universal keyHandler or use a lib
         */
        if (keyPressed && isEnterKey(keyPressed) && this.state.value && this.state.password) {
            this.onSubmit();
        }
    }
    private onSubmit = () => {
        this.props.onSubmit(this.state.value, this.state.password);
    }
}
