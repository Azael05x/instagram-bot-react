import * as React from "react";

export class AccountPage extends React.PureComponent {
    render() {
        const {
            match
        } = this.props as any;
        return (
            <div>
                {match.params.username}
            </div>
        );
    }
}
