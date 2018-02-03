import * as React from 'react';
import { connect } from "react-redux";
import * as styles from "./Dashboard.css";
import { withRouter, RouteComponentProps } from 'react-router';
import { DashboardHeader } from "./components/dashboard-header/DashboardHeader";
import { Divider } from '../divider/Divider';
import { EmptyList } from '../empty-list/EmptyList';
import { AccountItem } from "../account/Account";
import { selectAccounts } from '../../ducks/selectors';
import { setAccountStatusMiddlewareActionCreator } from '../../middleware/actions';
import { AccountData } from '../../middleware/types';

export interface DashboardStateProps {
    accounts: AccountData[];
}
export interface DashboardDispatchProps {
    onStatusChange: typeof setAccountStatusMiddlewareActionCreator;
}

export type DashboardProps = DashboardStateProps & DashboardDispatchProps & RouteComponentProps<{}>;

export class Dashboard extends React.Component<DashboardProps, {}> {
    public render() {
        const bodyComponent = this.props.accounts.length
            ? <div className={styles.accountsContainer}>{this.renderAccounts()}</div>
            : <EmptyList />

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
    onStatusChange: setAccountStatusMiddlewareActionCreator,
};

export const DashboardConnected = withRouter(connect<DashboardStateProps, {}>(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard));
