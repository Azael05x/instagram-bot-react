import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";

import { selectAccounts } from "@ducks/selectors";
import { setAccountStatusMiddlewareAction } from "@middleware/actions";
import { AccountData } from "@middleware/types";

import { DashboardHeader } from "./components/dashboard-header/DashboardHeader";
import { Divider } from "../divider/Divider";
import { EmptyList } from "../empty-list/EmptyList";
import { AccountItem } from "../account/Account";

import * as styles from "./Dashboard.scss";

export interface DashboardStateProps {
    accounts: AccountData[];
}
export interface DashboardDispatchProps {
    onStatusChange: typeof setAccountStatusMiddlewareAction;
}

export type DashboardProps = DashboardStateProps & DashboardDispatchProps & RouteComponentProps<{}>;

export class Dashboard extends React.Component<DashboardProps> {
    public render() {
        const bodyComponent = this.props.accounts.length
            ? <div className={styles.accountsContainer}>{this.renderAccounts()}</div>
            : <EmptyList />;

        return (
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <DashboardHeader />
                    <Divider />
                    {bodyComponent}
                </div>
            </div>
        );
    }
    private renderAccounts = () => {
        return this.props.accounts
            .map((account, i) => <AccountItem key={i} account={account} onStatusChange={this.onStatusChange} />);
    }
    private onStatusChange = (account: AccountData) => {
        this.props.onStatusChange({
            id: account.id,
            data: account,
        });
    }
}

const mapStateToProps = (state: any): DashboardStateProps=> ({
    accounts: selectAccounts(state),
});
const mapDispatchToProps = {
    onStatusChange: setAccountStatusMiddlewareAction,
};

export const DashboardConnected = withRouter(connect<DashboardStateProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard));

export default DashboardConnected;
