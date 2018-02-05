import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { getActivities } from "../../utils/requests";
import { AxiosResponse } from "axios";
import { selectUser } from "../../ducks/selectors";
import { CommentActivity, FollowActivity, LikeActivity } from "./types";
import { ActivityItem } from "./components/Activity";
import { EmptyList, EmptyListType } from "../empty-list/EmptyList";

export interface ActivitiesState {
    activities: (CommentActivity & FollowActivity & LikeActivity)[];
}
export interface ActivitiesOwnProps {
    accountId: number;
}
export interface ActivitiesStateProps {
    auth_token: string;
}
export interface ActivitiesDispatchProps {

}
export type ActivitiesProps =
    & ActivitiesStateProps
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
        const config = {
            headers: {
                "Authorization": this.props.auth_token,
            }
        };

        getActivities(this.props.accountId, config)
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
        // TODO: Add sorting by created_at
        return this.state.activities
            .map((activity, i) => <ActivityItem key={i} activityItem={activity} />);
    }
}

const mapStateToProps = (state: any) => ({
    auth_token: selectUser(state).auth_token,
})

const mapDispatchToProps = {
};

export const ActivitiesConnected = withRouter(connect<ActivitiesStateProps, ActivitiesDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Activities));

