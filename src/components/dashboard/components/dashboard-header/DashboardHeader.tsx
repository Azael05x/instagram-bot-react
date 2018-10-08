import * as React from "react";
import { Link } from "react-router-dom";
import * as styles from "./DashboardHeader.scss";

export class DashboardHeader extends React.PureComponent {
    public render() {
        return (
            <div className={styles.header}>
                <h2 className={styles.title}>Dashboard</h2>
                <Link
                    className={styles.button}
                    to={"/link-account"}
                >
                    Add an Instagram account
                </Link>
            </div>
        );
    }
}
