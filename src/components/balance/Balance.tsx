import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { EURO_HTML } from "@currencies";
import { getBalance } from "@utils/requests";
import { Path, InstaState } from "@types";
import { selectUser } from "@ducks/selectors";
import axios, { CancelTokenSource } from "axios";

import * as styles from "./Balance.scss";

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
    /**
     * Used to stop set state if component is unmounted
     */
    private cancellationTokenSource: CancelTokenSource;

    public componentDidMount() {
        this.props.isLogged && this.setBalance();
    }

    public componentDidUpdate(prevProps: BalanceStateProps, prevState: BalanceState) {
        if (
            prevProps.isLogged !== this.props.isLogged
            || prevState.balance !== this.state.balance
        ) {
            this.setBalance();
        }
    }

    public componentWillUnmount() {
        this.cancellationTokenSource && this.cancellationTokenSource.cancel();
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
        this.cancellationTokenSource = axios.CancelToken.source();

        try {
            const balance = (+(await getBalance({
                cancelToken: this.cancellationTokenSource.token,
            })).data).toFixed(2);

            this.setState({
                balance,
            });
        } catch (error) {
            /**
             * If the error is not an axios
             * Promise "cancellation", then
             * handle it
             */
            if (!axios.isCancel(error)) {
                throw new Error(error);
            }
        } finally {
            this.cancellationTokenSource = null;
        }
    }
}

const mapStateToProps = (state: InstaState): BalanceStateProps => ({
    isLogged: !!selectUser(state).email,
});
export const BalanceConnected = connect<BalanceStateProps>(mapStateToProps)(Balance);
