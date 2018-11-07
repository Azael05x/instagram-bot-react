import * as React from "react";
import { EURO_HTML } from "@currencies";
import { getBalance } from "@utils/requests";

import * as styles from "./Balance.scss";
import { Link } from "react-router-dom";
import { Path, InstaState } from "@types";
import { connect } from "react-redux";
import { selectUser } from "@ducks/selectors";

export interface BalanceState {
    balance: string;
}
export interface BalanceStateProps {
    isLogged: boolean;
}
export class Balance extends React.PureComponent<BalanceStateProps, BalanceState> {
    public state: BalanceState = {
        balance: "0"
    };

    public async componentDidMount() {
        this.props.isLogged && this.setBalance();
    }

    public componentDidUpdate(_: BalanceStateProps, prevState: BalanceState) {
        if (prevState.balance !== this.state.balance) {
            this.setBalance();
        }
    }

    public render() {
        if (!this.props.isLogged) {
            return null;
        }

        return (
            <Link to={Path.Profile} className={styles.container}>
                <span dangerouslySetInnerHTML={{__html: EURO_HTML}} />
                {this.state.balance}
            </Link>
        );
    }

    private setBalance = async () => {
        const balance = (+(await getBalance()).data).toFixed(2);

        this.setState({
            balance,
        });
    }
}

const mapStateToProps = (state: InstaState): BalanceStateProps => ({
    isLogged: !!selectUser(state).email,
});
export const BalanceConnected = connect<BalanceStateProps>(mapStateToProps)(Balance);
