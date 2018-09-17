import * as React from "react";
import * as styles from "./Badge.scss";
import * as classnames from "classnames";

export enum BadgeType {
    Danger = "danger",
    Warning = "warning",
    Default = "default",
}
export interface BadgeProps {
    label: string;
    type?: BadgeType;
}

export class Badge extends React.PureComponent<BadgeProps> {
    public static defaultProps = {
        type: BadgeType.Default,
    };

    render() {
        return (
            <span className={classnames(styles.badge, styles[this.props.type])}>
                {this.props.label}
            </span>
        );
    }
}
