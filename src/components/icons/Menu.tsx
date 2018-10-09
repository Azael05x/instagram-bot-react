// tslint:disable:max-line-length
import * as React from "react";
import * as styles from "./svg.scss";

export class MenuSVG extends React.PureComponent<React.SVGProps<SVGSVGElement>> {
    public render() {
        const { children, ...props } = this.props;

        return (
            <svg
                className={styles.icon}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                {...props}
            >
                <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/>
            </svg>
        );
    }
}
