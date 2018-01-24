import * as React from "react";
import * as styles from "./EmptyList.css";

export class EmptyList extends React.PureComponent {
    render() {
        return (
            <div className={styles.container}>
                <i className={`fa fa-instagram ${styles.icon}`} aria-hidden="true"></i>
                Looks like you're about to link your Instagram account!<br />
                To do so, just press on the Link Instagram account button on the upper right side.
            </div>
        );
    }
}
