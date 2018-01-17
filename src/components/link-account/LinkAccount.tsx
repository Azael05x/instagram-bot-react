import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { linkAccountMiddlewareActionCreator } from '../../middleware/actions';

export interface LinkAccountState {
    username: string;
    password: string;
}
export interface LinkAccountDispatchProps {
    addAccount: typeof linkAccountMiddlewareActionCreator;
}
export type LinkAccountProps = LinkAccountDispatchProps;

export class LinkAccount extends React.PureComponent<LinkAccountProps, LinkAccountState> {
    public constructor(props: LinkAccountProps) {
        super(props);

        this.state = {
            username: "iamaigars",
            password: "goodPass",
        }
    }
    render() {
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
)(LinkAccount) as any);

