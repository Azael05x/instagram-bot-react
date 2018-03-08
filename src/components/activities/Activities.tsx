import * as React from "react";
import { AxiosResponse } from "axios";

import { getActivities , setReviewed} from "../../utils/requests";
import { CommentActivity, FollowActivity, LikeActivity } from "./types";
import { ActivityItem } from "./components/Activity";
import { EmptyList, EmptyListType } from "../empty-list/EmptyList";
import { Divider, DividerTheme } from "../divider/Divider";
import { Select, SelectOption, SelectTheme } from "../select/Select";

import * as styles from "./Activities.scss";

export interface ActivitiesState {
    activities: (CommentActivity & FollowActivity & LikeActivity)[];
    activityType: ActivityType;
    isReviewed: boolean;
    reviewingInProgress: boolean;
}
export interface ActivitiesProps {
    accountId: number;
}

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

    public constructor(props: ActivitiesProps) {
        super(props);

        this.state = {
            activities: [],
            activityType: ActivityType.Likes,
            isReviewed: false,
            reviewingInProgress: false,
        };
    }
    public componentWillMount() {
        this.onLoadMore();
    }
    public componentDidUpdate(_nextProps: ActivitiesProps, nextState: ActivitiesState) {
        if (nextState.activityType !== this.state.activityType) {
            this.onLoadMore();
        }
    }
    public render() {

        const reviewComponent = (
            <div className={styles.reviewedContainer}>
                {!this.state.isReviewed
                    ? <>
                        <input
                            id="reviewed"
                            type="checkbox"
                            className={styles.checkbox}
                            onChange={this.markAsReviewed}
                            checked={this.state.isReviewed}
                        />
                        <label htmlFor="reviewed">Mark {this.state.activityType} as reviewed</label>
                    </>
                    : (this.state.reviewingInProgress
                        ? (
                            <span className={styles.reviewedAnswer}>
                                {`${this.state.activityType} successfully reviewed`}
                                <i className={`fa fa-check ${styles.icon}`} aria-hidden="true" />
                            </span>
                        )
                        : (
                            <span className={styles.reviewedAnswer}>
                                {`Review in progress...`}
                                <i className={`fa fa-spinner ${styles.icon}`} aria-hidden="true" />
                            </span>
                        )
                    )}
            </div>
        );

        return <>
            <div className={styles.selectActivityBox}>
                <Select
                    onSelectOption={this.setActivityType}
                    selectOptions={selectOptions}
                    theme={SelectTheme.Small}
                />
                {this.state.activities.length ? reviewComponent : null}
            </div>
            {this.state.activities.length
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
        getActivities(this.props.accountId, this.batchSize, this.nextTimeStamp, this.state.activityType)
            .then((response: AxiosResponse<{
                activities: (CommentActivity & FollowActivity & LikeActivity)[],
                next_timestamp: number,
            }>) => {
                this.nextTimeStamp = response.data.next_timestamp;
                this.setState({
                    activities: [...this.state.activities, ...response.data.activities],
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
            isReviewed,
        } = this.state;

        if (!isReviewed) {
            this.setState({
                isReviewed: true,
                reviewingInProgress: true,
            });

            setReviewed(
                this.props.accountId,
                activityType,
                activities[0].created_at_ms,
            )
                .then(() => {
                    this.setState({
                        reviewingInProgress: false,
                    });

                    window.setTimeout(() => {
                        this.setState({
                            isReviewed: false,
                        });
                    }, 10000);
                })
                .catch((error: any) => {
                    console.error(`Failed to set ${this.state.activityType} as reviewed: `, error);
                });
        }
    }
}
