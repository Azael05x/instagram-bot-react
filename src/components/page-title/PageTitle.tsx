import * as React from "react";
import { Divider, DividerTheme } from "../divider/Divider";

import * as styles from "./PageTitle.scss";

export interface PageTitleProps {
    title: string;
}
export class PageTitle extends React.PureComponent<PageTitleProps> {
    public render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>{this.props.title}</h1>
                <Divider theme={DividerTheme.Small} />
            </div>
        );
    }
}
