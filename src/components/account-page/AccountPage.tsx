import * as React from "react";
import { MatchProps } from "../../types/router";
import { unlinkAccountMiddlewareActionCreator } from "../../middleware/actions";
import { connect } from "react-redux";

export interface AccountPageDispatchProps {
    onDelete: typeof unlinkAccountMiddlewareActionCreator;
}
export type AccountPageProps = AccountPageDispatchProps & MatchProps<{ id: number }>;

export class AccountPage extends React.PureComponent<AccountPageProps, {}> {
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
        this.props.onDelete(this.props.match.params.id);
    }
}

const mapDispatchToProps = {
    onDelete: unlinkAccountMiddlewareActionCreator,
}

export const AccountPageConnected = connect<{}, AccountPageDispatchProps>(
    undefined,
    mapDispatchToProps,
)(AccountPage);
