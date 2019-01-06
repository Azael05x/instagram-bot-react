import * as React from "react";
import { Link } from "react-router-dom";
import { InfoData } from "./type";

import * as styles from "./Info.scss";

export type InfoProps = {
    infoData?: InfoData[];
};

export class Info extends React.PureComponent<InfoProps> {
    private renderInfoElements = () => {
        const { infoData } = this.props;
        return infoData.map((data, i) => (
            <small key={data.linkLabel + i}>
                {data.infoText}
                {" "}
                <Link to={data.infoPathTo} className={styles.link}>{data.linkLabel}</Link>
            </small>
        ));
    }

    public render() {
        const { infoData } = this.props;
        if (!infoData) {
            return null;
        }

        return (
            <div className={styles.container}>
                {this.renderInfoElements()}
            </div>
        );
    }
}
