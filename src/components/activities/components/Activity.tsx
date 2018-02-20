import * as React from "react";
import {
    FollowActivity,
    CommentActivity,
    LikeActivity,
    ActivityType,
} from "../types";
import {
    parseDate,
    parseTime,
} from "../../../utils/formatDate";
import * as styles from "./Activity.css";
import { revertAccountActivity } from "../../../utils/requests";
import { AxiosResponse } from "axios";

const placeholderImg = require("../../../assets/placeholder.png");
const userPlaceholderImg = require("../../../assets/user_placeholder.png");

interface ActivityState {
    loaded: boolean;
    failedLoaded: boolean;
    revertInProgress: boolean;
    revertError: boolean;
    unmount: boolean;
}
interface ActivityProps {
    activityItem: FollowActivity | CommentActivity | LikeActivity;
}

function hasAssetUrl(activity: any): activity is CommentActivity | LikeActivity {
    return activity.asset_url;
}

export class ActivityItem extends React.PureComponent<ActivityProps, ActivityState> {
    public state = {
        loaded: false,
        failedLoaded: false,
        revertInProgress: false,
        revertError: false,
        unmount: false,
    };
    public componentDidMount() {
        const activityMedia = new Image();
        activityMedia.onload = () => {
            this.setState({ loaded: true });
        };
        activityMedia.onerror = () => {
            this.setState({ failedLoaded: true });
        };
        activityMedia.classList.add(styles.mediaObject);
        activityMedia.src = hasAssetUrl(this.props.activityItem)
            ? this.props.activityItem.asset_url
            : this.props.activityItem.avatar_url;
    }
    public render() {
        if (this.state.unmount) {
            return null;
        }

        const { activityItem } = this.props;

        const createdAt = new Date(activityItem.created_at_ms);

        return (
            <div className={styles.container}>
                <div className={`${styles.sideBox} ${styles.time}`}>
                    <span>
                        {parseDate(createdAt)}
                    </span>
                    <span>
                        {parseTime(createdAt)}
                    </span>
                </div>
                <div className={styles.body}>
                    {this.renderActivity(activityItem)}
                </div>
                <div
                    className={`${styles.sideBox} ${styles.button} ${this.state.revertInProgress ? styles.blink : ""}`}
                    onClick={this.onRevert}
                >
                    {!this.state.revertInProgress && "Revert"}
                    <div style={{ display: `${this.state.revertInProgress ? "block" : "none"}`}}>
                        <i className="fas fa-cog fa-spin" style={{ fontSize: "1.5rem" }} />
                    </div>
                </div>
            </div>
        );
    }
    private renderActivity = (activity: FollowActivity | CommentActivity | LikeActivity) => {
        switch(activity.activity) {
            case ActivityType.Comment:
            case ActivityType.Like: {
                return this.renderLikesCommentsActivity(activity);
            }
            case ActivityType.Follow: {
                const followActivityStyle = {
                    backgroundImage: `url(${!this.state.failedLoaded ? activity.avatar_url : userPlaceholderImg})`,
                };

                return (
                    <div className={styles.row}>
                        <span>You followed</span>
                        <a className={styles.user} href={`https://instagram.com/${activity.username}`} target="_blank">
                            <div
                                style={followActivityStyle}
                                className={styles.avatar}
                            />
                            <span className={styles.username}>
                                {activity.username}
                            </span>
                        </a>
                    </div>
                );
            }
            default:
                return null;
        }
    }
    private renderLikesCommentsActivity = (activity: CommentActivity | LikeActivity) => {
        const {
            failedLoaded,
            loaded,
        } = this.state;
        const titlePhrase = activity.activity === ActivityType.Comment
            ? `You commented ${!activity.asset_url || failedLoaded ? "on a post" : ""}`
            : `You liked ${!activity.asset_url || failedLoaded ? "a post" : ""}`;

        return (
            <div className={styles.column}>
               {titlePhrase}
               {activity.activity === ActivityType.Comment && <q className={styles.comment}>{activity.text}</q>}
                <a
                    href={`https://instagram.com/p/${activity.shortcode}`}
                    target="_blank"
                    className={activity.asset_url && !failedLoaded ? styles.media : styles.link}
                >
                    {!activity.asset_url || failedLoaded
                        ? "View post"
                        : (
                            <img
                                className={styles.mediaObject}
                                src={loaded && !failedLoaded ? activity.asset_url : placeholderImg as string}
                            />
                        )
                    }
                </a>
            </div>
        );
    }
    private onRevert = () => {
        this.setState({
            revertInProgress: true,
        });
        const { activityItem } = this.props;

        revertAccountActivity(
            activityItem.instagram_id,
            {
                activity: {
                    id: activityItem.id,
                    activity: activityItem.activity,
                },
            }
        )
        .then((response: AxiosResponse<{ success: boolean, error: string }>) => {
            if (response.data.success) {
                this.setState({
                    unmount: true,
                });
            } else {
                this.setState({
                    revertInProgress: false,
                    revertError: true, // Used to display error tooltip. Will be implemented later 11.02.18 @RJ
                });
            }
        })
        .catch(error => {
            this.setState({
                revertInProgress: false,
            });
            console.error("REVERT ERROR", error);
        });
    }
}
