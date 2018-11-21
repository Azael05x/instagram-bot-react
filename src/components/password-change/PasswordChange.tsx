import * as React from "react";
import { ChangePasswordConnected } from "../user/components/ChangePassword";
import * as styles from "./PasswordChange.scss";

export class PasswordChange extends React.PureComponent {
    public render() {
        return (
            <div className={styles.container}>
                <ChangePasswordConnected
                    isChangeViaEmail={true}
                />
            </div>
        );
    }
}

export default PasswordChange;
