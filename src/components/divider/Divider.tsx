import * as React from "react";
import * as styles from "./Divider.scss";

export enum DividerTheme {
    FullWidth = "fullWidth",
    SmallBigMargin = "smallBigMargin",
    Small = "small",
}

export interface DividerProps {
    theme?: DividerTheme;
}

export class Divider extends React.PureComponent<DividerProps> {
    public static defaultProps = {
        theme: DividerTheme.FullWidth,
    };
    render() {
        return (
            <div className={`${styles.line} ${styles[this.props.theme]}`} />
        );
    }
}
