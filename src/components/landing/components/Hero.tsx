import * as React from "react";
import { Divider } from "../../divider/Divider";
import { Button, ButtonType } from "../../button/Button";

import * as styles from "../Landing.scss";

export class Hero extends React.PureComponent {
    private onFreeDemo = () => {
        // TODO: Redirect to sign up page
    }
    public render() {
        return (
            <div className={styles.heroContainer}>
                <div className={styles.heroTitleContainer}>
                    <h1 className={styles.heroTitle}>
                        Hello,
                    </h1>
                    <small className={styles.heroSub}>
                        would you like to boost <br />your Instagram account?
                    </small>
                    <Divider />
                    <Button
                        label={"Yes, I want a free demo"}
                        onClick={this.onFreeDemo}
                        type={ButtonType.Danger}
                    />
                </div>
                <div className={styles.heroImage}></div>
            </div>
        );
    }
}
