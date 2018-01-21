import * as React from "react";
import { connect } from "react-redux";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { unlinkAccountMiddlewareActionCreator } from "../../middleware/actions";
import { getAccountData } from "../../utils/requests";
import { selectUser } from "../../ducks/selectors";
import { AccountData } from "../../middleware/types";

export interface AccountPageState {
    account: AccountData;
}

export interface AccountPageStateProps {
    auth_token: string;
}
export interface AccountPageDispatchProps {
    onDelete: typeof unlinkAccountMiddlewareActionCreator;
}
export type AccountPageProps =
    & AccountPageDispatchProps
    & AccountPageStateProps
    & RouteComponentProps<{ id: number }>
;

export class AccountPage extends React.Component<AccountPageProps, AccountPageState> {
    public constructor(props: AccountPageProps) {
        super(props);

        this.state = {
            account: {} as AccountData,
        }
    }
    public componentWillMount() {
        const config: AxiosRequestConfig = {
            headers: {
                "Authorization": this.props.auth_token,
            }
        };

        getAccountData(this.props.match.params.id, config)
            .then((response: AxiosResponse<AccountData>) => {
                this.setState({ account: response.data });
            });
    }
    public render() {
        const { account } = this.state;

        return (
            <div>
                {account.username}
                {account.id}
                {""+account.is_active}
                <button onClick={this.onDelete}>
                    Delete
                </button>
            </div>
        );
    }
    private onDelete = () => {
        this.props.onDelete(+this.props.match.params.id);
    }
}

const mapStateToProps = (state: any): AccountPageStateProps => ({
    auth_token: selectUser(state).auth_token,
});

const mapDispatchToProps = {
    onDelete: unlinkAccountMiddlewareActionCreator,
}

export const AccountPageConnected = withRouter(connect<AccountPageStateProps, AccountPageDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(AccountPage));
