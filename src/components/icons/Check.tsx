// tslint:disable:max-line-length
import * as React from "react";
import { IconProps } from "./types";

export class CheckIcon extends React.PureComponent<IconProps, {}> {
    public static defaultProps = {
        fill: "#2DCC70",
        size: {
            height: "1rem",
            width: "1rem"
        },
    };
    render() {
        return (
            <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width={this.props.size.width}
                height={this.props.size.height}
                viewBox="0 0 160 90"
                preserveAspectRatio="xMidYMid meet"
            >
                <g transform="translate(0.000000,113.000000) scale(0.100000,-0.100000)" fill={this.props.fill} stroke="none">
                    <path d="M1029 665 l-463 -466 -228 228 c-125 125 -235 232 -245 236 -50 22 -105 -40 -83 -93 6 -14 134 -149 286 -300 l275 -275 56 60 c31 33 256 260 498 505 243 245 447 455 454 467 6 12 11 29 11 38 0 24 -46 65 -74 65 -19 0 -126 -102 -487 -465z" />
                </g>
            </svg>
        );
    }
}
