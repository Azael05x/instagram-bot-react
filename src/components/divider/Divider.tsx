import * as React from "react";
import * as styles from "./Divider.css";

export class Divider extends React.PureComponent {
    render() {
        return (
            <div className={styles.line} />
        );
    }
}
