import * as React from "react";
import { Redirect } from "react-router-dom";

import { Button, ButtonType } from "../button/Button";
import { getPressedKey, isEnterKey } from "@utils/keyboardEvents";

import { Info } from "./components/Info";
import { InfoData } from "./components/type";
import { FormGroup } from "./components/FormGroup";

import * as styles from "./UserForm.scss";

const onFormSubmitCb = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

export interface UserFormState {
    mainValue: string;
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
    hasVerification?: boolean;
}

export class UserForm extends React.PureComponent<UserFormProps, UserFormState> {
    public static defaultProps = {
        inputType: InputType.Email,
        hasVerification: false,
    };
    public state: UserFormState = {
        mainValue: "",
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
            hasVerification,
        } = this.props;

        const {
            password,
            mainValue,
            code,
        } = this.state;

        return (
            <form
                className={styles.formGroupContainer}
                onSubmit={onFormSubmitCb}
                noValidate={true}
            >
                <FormGroup
                    htmlFor={inputType}
                    onChange={this.onMainFieldChange}
                    onKeyUp={this.onKeyUp}
                    value={mainValue}
                    label={mainInputLabel || labelTextMap[inputType]}
                    type={inputType}
                />
                <FormGroup
                    htmlFor={"password"}
                    onChange={this.onPasswordChange}
                    onKeyUp={this.onKeyUp}
                    value={password}
                    label={"password"}
                    type={"password"}
                />
                {
                    hasVerification && (
                        <FormGroup
                            htmlFor={"code"}
                            onChange={this.onCodeChange}
                            onKeyUp={this.onKeyUp}
                            value={code}
                            label={"verification code"}
                        />
                    )
                }
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
    private onMainFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            mainValue: event.currentTarget.value,
        });
    }
    private onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: event.currentTarget.value,
        });
    }
    private onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            code: event.currentTarget.value,
        });
    }
    private onKeyUp = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
         const keyPressed = getPressedKey(event);
        /**
         * If more key presses have to be handled
         * then create universal keyHandler or use a lib
         */
        if (keyPressed && isEnterKey(keyPressed) && this.state.mainValue && this.state.password) {
            this.onSubmit();
        }
    }
    private onSubmit = () => {
        this.props.onSubmit(this.state.mainValue, this.state.password, this.state.code);
    }
}
