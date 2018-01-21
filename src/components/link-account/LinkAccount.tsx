import * as React from 'react';
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { linkAccountMiddlewareActionCreator } from '../../middleware/actions';

export interface LinkAccountState {
    username: string;
    password: string;
}
export interface LinkAccountDispatchProps {
    addAccount: typeof linkAccountMiddlewareActionCreator;
}
export type LinkAccountProps = LinkAccountDispatchProps & RouteComponentProps<{}>;

export class LinkAccount extends React.Component<LinkAccountProps, LinkAccountState> {
    public constructor(props: LinkAccountProps) {
        super(props);

        this.state = {
            username: "iamaigars",
            password: "goodPass",
        }
    }
    public shouldComponentUpdate(nextProps: LinkAccountProps, nextState: LinkAccountState) {
        return false
            || nextProps.addAccount !== this.props.addAccount
            || nextState.username !== this.state.username
            || nextState.password !== this.state.password
        ;
    }
    public render() {
        return (
            <div>
                Link account
                <button onClick={this.onLinkAccount}>Link it</button>
            </div>
        );
    }
    private onLinkAccount = () => {
        this.props.addAccount({ username: this.state.username, password: this.state.password})
    }
}

const mapDispatchToProps = {
    addAccount: linkAccountMiddlewareActionCreator,
};

export const LinkAccountConnected = withRouter(connect<{}, LinkAccountDispatchProps>(
    undefined,
    mapDispatchToProps,
)(LinkAccount));

