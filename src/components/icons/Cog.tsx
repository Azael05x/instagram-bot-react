// tslint:disable:max-line-length
import * as React from "react";
import * as styles from "./svg.scss";

export class CogSVG extends React.PureComponent<React.SVGProps<SVGSVGElement>> {
    public render() {
        const { children, fill, ...props } = this.props;

        return (
            <svg
                className={styles.icon}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                {...props}
            >
                <path fill={fill} d="M445 291l42 25c5 3 8 8 6 14-11 35-30 68-55 94a12 12 0 0 1-15 3l-42-25a192 192 0 0 1-61 35v49a12 12 0 0 1-9 12c-35 8-73 8-110 0-5-1-9-6-9-12v-49a192 192 0 0 1-61-35l-42 25a12 12 0 0 1-15-3c-25-26-44-59-55-94-2-6 1-11 6-14l42-25a193 193 0 0 1 0-70l-42-25c-5-3-8-8-6-14 11-35 30-68 55-94a12 12 0 0 1 15-3l42 25a192 192 0 0 1 61-35V26a12 12 0 0 1 9-12c35-8 73-8 110 0 5 1 9 6 9 12v49a192 192 0 0 1 61 35l42-25a12 12 0 0 1 15 3c25 26 44 59 55 94 2 6-1 11-6 14l-42 25a193 193 0 0 1 0 70zm-109-35a80 80 0 1 0-160 0 80 80 0 0 0 160 0z"/>
            </svg>
        );
    }
}
