import * as React from 'react';
import { connect } from "react-redux";
import * as styles from "./Dashboard.css";
import { withRouter } from 'react-router';
import { DashboardHeader } from "./components/dashboard-header/DashboardHeader";
import { Divider } from '../divider/Divider';
import { EmptyList } from './components/empty-list/EmptyList';
import { AccountItem, UserAccount} from "./components/account/Account";
import { selectAccounts } from '../../ducks/selectors';

export interface DashboardStateProps {
    accounts: UserAccount[];
}

export type DashboardProps = DashboardStateProps;

export class Dashboard extends React.PureComponent<DashboardProps, {}> {
    render() {
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
        return this.props.accounts.map((account, i) => <AccountItem key={i} account={account} />);
    }
}

const mapStateToProps = (state: any): DashboardStateProps=> ({
    accounts: selectAccounts(state),
});

export const DashboardConnected = withRouter(connect<DashboardStateProps, {}>(
    mapStateToProps,
    {},
)(Dashboard) as any);
