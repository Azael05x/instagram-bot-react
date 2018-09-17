import * as React from "react";
import * as styles from "./Divider.scss";
import * as classnames from "classnames";

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

    public render() {
        return (
            <div className={classnames(styles.line, styles[this.props.theme])} />
        );
    }
}
