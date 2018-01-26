import * as React from "react";
import { Badge, BadgeType } from "../../badge/Badge";

import * as styles from "./Username.css";

export interface UsernameProps {
    username: string;
    isActive: boolean;
}

export class Username extends React.PureComponent<UsernameProps> {
    render() {
        return (
            <div className={styles.usernameContainer}>
                <span className={styles.username}>@{this.props.username}</span>
                <Badge
                    label={this.props.isActive ? "Active" : "Paused"}
                    type={this.props.isActive ? BadgeType.Default : BadgeType.Danger}
                />
            </div>
        );
    }
}
