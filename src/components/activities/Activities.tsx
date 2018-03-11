import * as React from "react";
import { AxiosResponse } from "axios";
import { connect } from "react-redux";

import { getActivities , setReviewed} from "../../utils/requests";
import { CommentActivity, FollowActivity, LikeActivity } from "./types";
import { ActivityItem } from "./components/Activity";
import { EmptyList, EmptyListType } from "../empty-list/EmptyList";
import { Divider, DividerTheme } from "../divider/Divider";
import { Select, SelectOption, SelectTheme } from "../select/Select";
import { Button, ButtonSize } from "../button/Button";
import { showToastAction } from "../toast/ducks/actions";
import { ToastType } from "../toast/ducks/state";

import * as styles from "./Activities.scss";

export interface ActivitiesState {
    activities: (CommentActivity & FollowActivity & LikeActivity)[];
    activityType: ActivityType;
    isReviewed: boolean;
    reviewingInProgress: boolean;
    returnReviewed: boolean;
}

export interface ActivitiesDispatchProps {
    showToast: typeof showToastAction;
}
export interface ActivitiesOwnProps {
    accountId: number;
}
export type ActivitiesProps = ActivitiesOwnProps & ActivitiesDispatchProps;

export enum ActivityType {
    Likes = "likes",
    Comments = "comments",
    Follows = "follows",
}
const selectOptions: SelectOption[] = [
    {
        dataRole: ActivityType.Likes,
        label: "Likes",
    },
    {
        dataRole: ActivityType.Comments,
        label: "Comments",
    },
    {
        dataRole: ActivityType.Follows,
        label: "Follows",
    },
];

export class Activities extends React.PureComponent<ActivitiesProps, ActivitiesState> {
    public batchSize = 20;
    public activityType: ActivityType = ActivityType.Likes;
    public nextTimeStamp: number | null = Date.now();

    public state: ActivitiesState = {
        activities: [],
        activityType: ActivityType.Likes,
        isReviewed: false,
        returnReviewed: false,
        reviewingInProgress: false,
    };
    public componentWillMount() {
        this.onLoadMore();
    }
    public componentDidUpdate(_nextProps: ActivitiesProps, nextState: ActivitiesState) {
        if (nextState.activityType !== this.state.activityType) {
            this.setState({
                returnReviewed: false,
            }, this.onLoadMore);
        }
    }
    public render() {
        const {
            activityType,
            reviewingInProgress,
            activities,
        } = this.state;

        const reviewButtonLabel = !reviewingInProgress
            ? `Mark ${activityType} as reviewed`
            : "Reviewing...";

        const reviewComponent = (
            <div className={styles.reviewedContainer}>
                <div className={`${styles.icon} ${!reviewingInProgress && styles.hidden}`}>
                    <i className="fas fa-spinner" />
                </div>
                <Button
                    onClick={this.markAsReviewed}
                    label={reviewButtonLabel}
                    size={ButtonSize.Small}
                />
            </div>
        );

        return <>
            <div className={styles.selectActivityBox}>
                <Select
                    onSelectOption={this.setActivityType}
                    selectOptions={selectOptions}
                    theme={SelectTheme.Small}
                />
                {activities.length ? reviewComponent : null}
            </div>
            {activities.length
                ? <>
                    <Divider theme={DividerTheme.SmallBigMargin} />
                    {this.renderActivity()}
                    {this.nextTimeStamp && (
                        <>
                            <Divider theme={DividerTheme.SmallBigMargin} />
                            <button className={styles.loadMore} onClick={this.onLoadMore}>Load more</button>
                        </>
                    )}
                </>
                : <EmptyList type={EmptyListType.NoActivities} />
            }
        </>;
    }
    private renderActivity = () => {
        return this.state.activities
            .map((activity, i) => <ActivityItem key={i} activityItem={activity} />);
    }
    private setActivityType = (event: React.MouseEvent<HTMLElement>) => {
        const chosenScreen = event.currentTarget.getAttribute("data-role") as ActivityType;

        if (this.state.activityType !== chosenScreen) {
            this.nextTimeStamp = Date.now();
            this.setState({
                activityType: chosenScreen,
                activities: [],
            });
        }
    }
    private onLoadMore = () => {
        getActivities(
            this.props.accountId,
            this.batchSize,
            this.nextTimeStamp,
            this.state.returnReviewed,
            this.state.activityType,
        )
            .then((response: AxiosResponse<{
                activities: (CommentActivity & FollowActivity & LikeActivity)[],
                next_timestamp: number,
            }>) => {
                this.nextTimeStamp = response.data.next_timestamp;
                this.setState({
                    activities: [...this.state.activities, ...response.data.activities],
                    returnReviewed: true,
                });
            })
            .catch((error: any) => {
                console.error("Failed to get acitivites: ", error);
            });
    }
    private markAsReviewed = () => {
        const {
            activities,
            activityType,
        } = this.state;

        this.setState({
            reviewingInProgress: true,
            isReviewed: false,
        });

        setReviewed(
            this.props.accountId,
            activityType,
            activities[0].created_at_ms,
        )
            .then(() => {
                setTimeout(() => {
                    this.props.showToast(
                        <>Successfully reviewed {this.state.activityType}</>,
                        ToastType.Success,
                    );
                    this.setState({
                        reviewingInProgress: false,
                        isReviewed: true,
                    });
                }, 1000);
            })
            .catch((error: any) => {
                console.error(`Failed to set ${this.state.activityType} as reviewed: `, error);
                this.props.showToast(
                    <>Oh snap, please try again later to review {this.state.activityType}</>,
                    ToastType.Error,
                );
            });
    }
}

const mapDispatchToProps: ActivitiesDispatchProps = {
    showToast: showToastAction,
};

export const ActivitiesConnected = connect<{}, ActivitiesDispatchProps>(
    undefined,
    mapDispatchToProps,
)(Activities);
