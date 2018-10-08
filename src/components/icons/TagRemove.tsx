// tslint:disable:max-line-length
import * as React from "react";
import * as classnames from "classnames";
import * as styles from "./svg.scss";

export class TagRemoveSVG extends React.PureComponent<React.SVGProps<SVGSVGElement>> {
    public render() {
        const { children, ...props } = this.props;

        return (
            <svg
                style={{ transform: "rotate(45deg)"}}
                className={classnames(styles.icon, styles.neutral)}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                {...props}
            >
                <path d="M448 294.2v-76.4c0-13.3-10.7-24-24-24H286.2V56c0-13.3-10.7-24-24-24h-76.4c-13.3 0-24 10.7-24 24v137.8H24c-13.3 0-24 10.7-24 24v76.4c0 13.3 10.7 24 24 24h137.8V456c0 13.3 10.7 24 24 24h76.4c13.3 0 24-10.7 24-24V318.2H424c13.3 0 24-10.7 24-24z"/>
            </svg>
        );
    }
}
