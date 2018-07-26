import * as React from "react";
import { Link } from "react-router-dom";
import { InfoData } from "./type";

import * as styles from "./Info.scss";

export type InfoProps = {
    infoData?: InfoData;
};

export class Info extends React.PureComponent<InfoProps> {
    public render() {
        if (!this.props.infoData) {
            return null;
        }

        const {
            infoData: {
                infoPathTo,
                infoText,
                linkLabel,
            },
        } = this.props;

        return (
            <small className={styles.container}>
                {infoText}
                {" "}
                <Link to={infoPathTo} className={styles.link}>{linkLabel}</Link>
            </small>
        );
    }
}
