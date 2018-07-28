import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export class NoMatch extends React.Component<RouteComponentProps<{}>> {
    public shouldComponentUpdate() {
        return false;
    }
    render() {
        // TODO: Fill with meaningful content
        return (
            <div>
                NO MATCH
            </div>
        );
    }
}

export default NoMatch;
