import * as React from "react";
import { Redirect } from "react-router-dom";

import { Button, ButtonType } from "../button/Button";
import { getPressedKey, isEnterKey } from "@utils/keyboardEvents";

import { Info } from "./components/Info";
import { InfoData } from "./components/type";

import * as styles from "./UserForm.scss";

const onFormSubmitCb = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

export interface UserFormState {
    value: string;
    password: string;
    code: string;
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
    onSubmit: (email: string, password: string, code?: string) => void;
    actionInProgress: boolean;
    redirect: boolean;
    redirectEndpoint: string;
    buttonLabel: string;
    mainInputLabel?: string;
    buttonType?: ButtonType;
    inputType?: InputType;
    infoData?: InfoData;
}

export class UserForm extends React.PureComponent<UserFormProps, UserFormState> {
    public static defaultProps = {
        inputType: InputType.Email,
    };
    public state: UserFormState = {
        value: "",
        password: "",
        code: "",
    };
    public render() {
        if (this.props.redirect) {
            return <Redirect exact to={this.props.redirectEndpoint} />;
        }

        const {
            actionInProgress,
            buttonLabel,
            buttonType,
            infoData,
            inputType,
            mainInputLabel,
        } = this.props;

        const {
            password,
            value,
            code,
        } = this.state;

        return (
            <form className={styles.formGroupContainer} onSubmit={onFormSubmitCb} noValidate={true}>
                <div className={styles.formGroup}>
                    <label
                        htmlFor={inputType}
                        className={`${ value && styles.hidden} ${styles.label}`}
                    >
                        {mainInputLabel || labelTextMap[inputType]}
                    </label>
                    <input
                        id={inputType}
                        className={styles.input}
                        type={inputType}
                        onChange={this.onEmailChange}
                        value={value}
                        autoComplete="nope"
                        autoCapitalize="nope"
                        autoCorrect="nope"
                        onKeyUp={this.onEnterKey}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label
                        htmlFor="password"
                        className={`${ password && styles.hidden} ${styles.label}`}
                    >
                        password
                    </label>
                    <input
                        id="password"
                        className={styles.input}
                        type="password"
                        onChange={this.onPasswordChange}
                        value={password}
                        autoComplete="nope"
                        autoCapitalize="nope"
                        autoCorrect="nope"
                        onKeyUp={this.onEnterKey}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label
                        htmlFor={"code"}
                        className={`${ code && styles.hidden} ${styles.label} ${styles.italic}`}
                    >
                        Verification code
                    </label>
                    <input
                        id={"code"}
                        className={styles.input}
                        type={"number"}
                        onChange={this.onCodeChange}
                        value={code}
                        autoComplete="nope"
                        autoCapitalize="nope"
                        autoCorrect="nope"
                        onKeyUp={this.onEnterKey}
                    />
                </div>
                <div className={styles.formGroup}>
                    <div className={`${styles.spinner} ${!actionInProgress && styles.hidden}`}>
                        <i className="fas fa-spinner" />
                    </div>
                    <Button
                        label={buttonLabel}
                        onClick={this.onSubmit}
                        type={buttonType}
                    />
                </div>
                <Info infoData={infoData} />
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
    private onCodeChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        this.setState({
            code: event.currentTarget.value,
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
        this.props.onSubmit(this.state.value, this.state.password, this.state.code);
    }
}
