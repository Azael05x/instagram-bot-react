import * as React from "react";
import * as styles from "./FluidTitle.scss";

export interface FluidTitleProps {
    title: string | JSX.Element;
}
export class FluidTitle extends React.PureComponent<FluidTitleProps> {
    public render() {
        return <h1 className={styles.title}>{this.props.title}</h1>;
    }
}
