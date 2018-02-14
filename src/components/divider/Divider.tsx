import * as React from "react";
import * as styles from "./Divider.css";

export enum DividerTheme {
    FullWidth = "fullWidth",
    SmallBigMargin = "smallBigMargin",
    Small = "small",
}

export class Divider extends React.PureComponent<{ theme?: DividerTheme }> {
    public static defaultProps = {
        theme: DividerTheme.FullWidth,
    }
    render() {
        return (
            <div className={`${styles.line} ${styles[this.props.theme]}`} />
        );
    }
}
