import * as React from "react";
import * as styles from "./Landing.scss";
import { RouteComponentProps } from "react-router-dom";

export type LandingProps = RouteComponentProps<{}>;

export class Landing extends React.Component<LandingProps> {
    render() {
        return (
            <div className={styles.container}>
                Hi.
                <div className={styles.item}></div>
            </div>
        );
    }
}
