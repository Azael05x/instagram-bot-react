import * as React from "react";

export class CaretIcon extends React.PureComponent {
    render() {
        return (
            <svg
                viewBox="0 0 18 18"
                role="presentation"
                aria-hidden="true"
                focusable="false"
                style={{height: "0.7em", width: "0.7em", display: "block", fill: "currentcolor", marginLeft: "0.5em"}}
            >
                <path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fill-rule="evenodd"></path>
            </svg>
        );
    }
}
