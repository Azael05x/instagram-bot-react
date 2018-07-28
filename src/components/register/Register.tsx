import * as React from "react";
import { SignUpConnected } from"../landing/components/SignUp";
import { Divider, DividerTheme } from "../divider/Divider";

import * as styles from "./Register.scss";

export class Register extends React.PureComponent {
    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Try us out now for free!</h1>
                <Divider theme={DividerTheme.SmallBigMargin} />
                <SignUpConnected />
            </div>
        );
    }
}

export default Register;
