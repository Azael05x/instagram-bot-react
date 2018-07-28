import * as React from "react";
import * as styles from "./Loading.scss";

const rocketImg = require("../../assets/hero.png") as string;

export class Loading extends React.PureComponent {
    render() {
        /* Fill with content */
        return (
            <div className={styles.container}>
                <img src={rocketImg} className={styles.rocket1} />
                <img src={rocketImg} className={styles.rocket2} />
                <img src={rocketImg} className={styles.rocket3} />
            </div>
        );
    }
}
