import * as React from "react";
import * as styles from "./Landing.css";
import { RouteComponentProps } from "react-router-dom";

export type LandingProps = RouteComponentProps<{}>;

export class Landing extends React.Component<LandingProps> {
    render() {
        return (
            <div className={styles.container}>
                Hi.
            </div>
        );
    }
}
