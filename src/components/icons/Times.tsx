// tslint:disable:max-line-length
import * as React from "react";
import { LinkSVG } from "./Link";

export class TimesSVG extends React.PureComponent<React.SVGProps<SVGSVGElement>> {
    public render() {
        return (
            <LinkSVG style={{ transform: "rotate(45deg)"}} />
        );
    }
}
