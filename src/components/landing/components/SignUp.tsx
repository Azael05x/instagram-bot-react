import * as React from "react";
import { Divider, DividerTheme } from "../../divider/Divider";
import { Button, ButtonType } from "../../button/Button";
import { ENTER_KEY, REGISTER_URL } from "../../../consts";

import * as styles from "../Landing.scss";


// TODO: REMOVE LINES BELOW
import axios from 'axios';





export interface SignUpState {
    email: string;
    password: string;
}

export class SignUp extends React.PureComponent<{}, SignUpState> {
    public state: SignUpState = {
        email: "",
        password: "",
    };
    public render() {
        return <>
            <h1 className={styles.title}>
                Not sure?<br />
                Try us for <span className={styles.accent}>free</span>!
            </h1>
            <Divider theme={DividerTheme.Small} />
            <div>
                <div className={styles.formGroup}>
                    <label
                        htmlFor="email"
                        className={`${ this.state.email && styles.hidden} ${styles.label}`}
                    >
                        Your email...
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
                        Password...
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
                    <Button
                        label={"Sign Up"}
                        onClick={this.onSubmit}
                        type={ButtonType.Danger}
                    />
                </div>
            </div>
        </>;
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
    private onSubmit = async () => {
        return await axios.post(REGISTER_URL, this.state);
        // TODO: Redirect to sing up page
    }
}
