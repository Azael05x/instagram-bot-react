import * as React from "react";
import { EURO_HTML } from "@currencies";
import { getBalance } from "@utils/requests";

import * as styles from "./Balance.scss";
import { Link } from "react-router-dom";
import { Path } from "@types";

export interface BalanceState {
    balance: string;
}

export class Balance extends React.PureComponent<{}, BalanceState> {
    public state: BalanceState = {
        balance: "0"
    };

    public async componentDidMount() {
        const balance = (+(await getBalance()).data).toFixed(2);

        this.setState({
            balance,
        });
    }

    public render() {
        return (
            <Link to={Path.Profile} className={styles.container}>
                <span dangerouslySetInnerHTML={{__html: EURO_HTML}} />
                {this.state.balance}
            </Link>
        );
    }
}
