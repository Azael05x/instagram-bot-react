import * as React from "react";
import { postResetPasswordViaLink } from "@utils/requests";
import { ChangePasswordConnected } from "../user/components/ChangePassword";
import * as styles from "./ResetPassword.scss";

export class ResetPassword extends React.PureComponent {
    public render() {
        return (
            <div className={styles.container}>
                <ChangePasswordConnected
                    isChangeViaEmail={true}
                    callback={postResetPasswordViaLink}
                />
            </div>
        );
    }
}

export default ResetPassword;
