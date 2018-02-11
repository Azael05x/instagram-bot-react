import * as React from "react";
import { AxiosResponse } from "axios";

import { getActivities } from "../../utils/requests";
import { CommentActivity, FollowActivity, LikeActivity } from "./types";
import { ActivityItem } from "./components/Activity";
import { EmptyList, EmptyListType } from "../empty-list/EmptyList";

export interface ActivitiesState {
    activities: (CommentActivity & FollowActivity & LikeActivity)[];
}
export interface ActivitiesProps {
    accountId: number;
}

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
            .map((activity, i) => <ActivityItem key={i} activityItem={activity} />);
    }
}
