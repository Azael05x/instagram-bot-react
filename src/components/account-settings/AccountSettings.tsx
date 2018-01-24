import * as React from "react";

export interface AccountSettingsProps {
    username: string;
}

export class AccountSettings extends React.PureComponent<AccountSettingsProps> {
    render() {
        return (
            <div>
                {this.props.username}
            </div>
        );
    }
}
