import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { getActivities } from "../../utils/requests";
import { AxiosResponse } from "axios";
import { CommentActivity, FollowActivity, LikeActivity } from "./types";
import { ActivityItem } from "./components/Activity";
import { EmptyList, EmptyListType } from "../empty-list/EmptyList";
import { revertAccountActivityMiddlewareActionCreator } from "../../middleware/actions";

export interface ActivitiesState {
    activities: (CommentActivity & FollowActivity & LikeActivity)[];
}
export interface ActivitiesOwnProps {
    accountId: number;
}

export interface ActivitiesDispatchProps {
    onRevert: typeof revertAccountActivityMiddlewareActionCreator;
}
export type ActivitiesProps =
    & ActivitiesOwnProps
    & ActivitiesDispatchProps
    & RouteComponentProps<{}>
;

export class Activities extends React.PureComponent<ActivitiesProps, ActivitiesState> {
    public constructor(props: ActivitiesProps) {
        super(props);

        this.state = {
            activities: [],
        }
    }
    public componentWillMount() {
        getActivities(this.props.accountId)
            .then((response: AxiosResponse<(CommentActivity & FollowActivity & LikeActivity)[]>) => {
                this.setState({
                    activities: response.data,
                });
            })
            .catch((error: any) => {
                console.error("Failed to get acitivites: ", error);
            });
    }
    public render() {
        if (!this.state.activities.length) {
            return <EmptyList type={EmptyListType.NoActivities} />;
        }

        return  <>{this.renderActivity()}</>;
    }
    private renderActivity = () => {
        return this.state.activities
            .map((activity, i) => <ActivityItem key={i} activityItem={activity} onRevert={this.onRevert} />);
    }
    private onRevert = () => {
        console.log("ON REVERT")
        // this.props.onRevert();
    }
}

const mapDispatchToProps = {
    onRevert: revertAccountActivityMiddlewareActionCreator,
};

export const ActivitiesConnected = withRouter(connect<{}, ActivitiesDispatchProps>(
    undefined,
    mapDispatchToProps,
)(Activities));

