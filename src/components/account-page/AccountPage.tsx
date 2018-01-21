import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { unlinkAccountMiddlewareActionCreator } from "../../middleware/actions";
export interface AccountPageDispatchProps {
    onDelete: typeof unlinkAccountMiddlewareActionCreator;
}
export type AccountPageProps = AccountPageDispatchProps & RouteComponentProps<{ id: number }>;

export class AccountPage extends React.Component<AccountPageProps, {}> {
    public render() {
        const {
            match
        } = this.props;

        return (
            <div>
                {match.params.id}
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

const mapDispatchToProps = {
    onDelete: unlinkAccountMiddlewareActionCreator,
}

export const AccountPageConnected = withRouter(connect<{}, AccountPageDispatchProps>(
    undefined,
    mapDispatchToProps,
)(AccountPage));
