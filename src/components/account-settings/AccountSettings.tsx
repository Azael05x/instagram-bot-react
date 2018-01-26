import * as React from "react";
import { AccountData } from "../../middleware/types";

export interface AccountSettingsProps {
    account: AccountData;
}

export class AccountSettings extends React.PureComponent<AccountSettingsProps> {
    render() {
        return (
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }
}
