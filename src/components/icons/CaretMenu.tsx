// tslint:disable:max-line-length
import * as React from "react";
import * as styles from "./svg.scss";

export class CaretMenuSVG extends React.PureComponent<React.SVGProps<SVGSVGElement>> {
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
                <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/>
            </svg>
        );
    }
}
