import * as React from "react";
import { SignUpConnected } from"../landing/components/SignUp";
import { FluidTitle } from "../fluid-title/FluidTitle";

import * as styles from "./Register.scss";

export class Register extends React.PureComponent {
    render() {
        return (
            <div className={styles.container}>
                <FluidTitle title={"Try us out now for free!"} />
                <SignUpConnected />
            </div>
        );
    }
}

export default Register;
