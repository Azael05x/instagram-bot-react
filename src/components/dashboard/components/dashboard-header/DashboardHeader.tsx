import * as React from "react";
import { Link } from "react-router-dom";
import * as styles from "./DashboardHeader.css";

export class DashboardHeader extends React.PureComponent {
    render() {
        return (
            <div className={styles.header}>
                <h2>Dashboard</h2>
                <Link
                    className={styles.button}
                    to={"/link-account"}
                >
                    <i className="fas fa-plus"></i>
                    {" "}
                    Link Instagram account
                </Link>
            </div>
        );
    }
}
