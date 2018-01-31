import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import { AxiosResponse } from "axios";
import { postAccount } from "../../utils/requests";
import { AccountData } from "../../middleware/types";
import { selectUser } from "../../ducks/selectors";
import { linkAccountActionCreator } from "../../ducks/actions";
import { ErrorCode } from "../error-message/types";
import { ErrorMessage } from "../error-message/ErrorMessage";
import * as styles from "./LinkAccount.css";

export interface LinkAccountState {
    username: string;
    password: string;
    loading: boolean;
    redirect: boolean;
    errorMessage: ErrorCode | undefined;
}
export interface LinkAccountStateProps {
    auth_token: string;
}
export interface LinkAccountDispatchProps {
    addAccount: typeof linkAccountActionCreator;
}
export type LinkAccountProps = LinkAccountDispatchProps & LinkAccountStateProps & RouteComponentProps<{}>;

export class LinkAccount extends React.Component<LinkAccountProps, LinkAccountState> {
    public constructor(props: LinkAccountProps) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loading: false,
            redirect: false,
            errorMessage: undefined,
        }
    }
    public shouldComponentUpdate(nextProps: LinkAccountProps, nextState: LinkAccountState) {
        return false
            || nextProps.addAccount !== this.props.addAccount
            || nextState.username !== this.state.username
            || nextState.password !== this.state.password
            || nextState.loading !== this.state.loading
            || nextState.errorMessage !== this.state.errorMessage
        ;
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect exact to={"/accounts"} />
        }
        
        return (
            <div className={styles.container}>
                <div className={styles.form}>
                    <h2>Link your Instagram account</h2>
                    <div className={styles.formInputs}>
                        <div className={styles.formGroup}>
                            <label
                                htmlFor="username"
                                className={styles.label}
                                hidden={!!this.state.username}
                            >
                                Your instagram @username
                            </label>
                            <input
                                id="username"
                                type="text"
                                className={styles.input}
                                onChange={this.onNameChange}
                                autoCapitalize="false"
                                autoComplete="false"
                                autoFocus={true}
                                autoCorrect="false"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label
                                htmlFor="email"
                                className={styles.label}
                                hidden={!!this.state.password}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className={styles.input}
                                onChange={this.onPasswordChange}
                            />
                        </div>
                    </div>
                    <ErrorMessage errorCode={this.state.errorMessage} />
                    <button
                        className={styles.button}
                        onClick={this.onLinkAccount}
                    >
                        {!this.state.loading
                            ? "Link it"
                            : "Loading..."
                        }
                    </button>
                </div>
            </div>
        );
    }
    private onLinkAccount = () => {
        if (!this.state.username && !this.state.password) {
            return;
        }
        this.setState({ loading: true });

        const data = {
            username: this.state.username,
            password: this.state.password,
        };
        const config = {
            headers: {
                "Authorization": this.props.auth_token,
            }
        };

        postAccount(data, config)
            .then((response: AxiosResponse<AccountData>) => {
                this.setState({
                    loading: false,
                    redirect: true,
                });
                this.props.addAccount(response.data);
            })
            .catch(error => {
                this.setState({
                    errorMessage: `${error.response.status}` as ErrorCode,
                    loading: false,
                });
            });
    }
    private onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            username: event.currentTarget.value,
            errorMessage: undefined,
        });
    }
    private onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: event.currentTarget.value,
            errorMessage: undefined,
        });
    }
}

const mapStateToProps = (state: any) => ({
    auth_token: selectUser(state).auth_token,
})

const mapDispatchToProps = {
    addAccount: linkAccountActionCreator,
};

export const LinkAccountConnected = withRouter(connect<LinkAccountStateProps, LinkAccountDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(LinkAccount));

