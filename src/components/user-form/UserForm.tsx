import * as React from "react";
import { Redirect } from "react-router-dom";

import { Button, ButtonType } from "../button/Button";
import { ENTER_KEY } from "../../consts";

import * as styles from "./UserForm.scss";

export interface UserFormState {
    email: string;
    password: string;
}

export interface UserFormProps {
    onSubmit: (email: string, password: string) => void;
    actionInProgress: boolean;
    redirect: boolean;
    redirectEndpoint: string;
    buttonLabel: string;
    mainInputLabel?: string;
    buttonType?: ButtonType;
}

export class UserForm extends React.PureComponent<UserFormProps, UserFormState> {
    public state: UserFormState = {
        email: "",
        password: "",
    };
    public render() {
        if (this.props.redirect) {
            return <Redirect exact to={this.props.redirectEndpoint} />;
        }

        return (
            <form className={styles.formGroupContainer} onSubmit={(e) => e.preventDefault()} noValidate={true}>
                <div className={styles.formGroup}>
                    <label
                        htmlFor="email"
                        className={`${ this.state.email && styles.hidden} ${styles.label}`}
                    >
                        {this.props.mainInputLabel || "emai"}
                    </label>
                    <input
                        id="email"
                        className={styles.input}
                        type="email"
                        onChange={this.onEmailChange}
                        value={this.state.email}
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
            email: event.currentTarget.value,
        });
    }
    private onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        this.setState({
            password: event.currentTarget.value,
        });
    }
    private onEnterKey = (key: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (key.keyCode === ENTER_KEY && this.state.email && this.state.password) {
            this.onSubmit();
        }
    }
    private onSubmit = () => {
        this.props.onSubmit(this.state.email, this.state.password);
    }
}
