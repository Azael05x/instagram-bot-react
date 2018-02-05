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

export interface ActivityProps {
    activityItem: FollowActivity | CommentActivity | LikeActivity;
}

export class ActivityItem extends React.PureComponent<ActivityProps> {
    public render() {
        const { activityItem } = this.props;

        const createdAt = new Date(activityItem.created_at);

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
                <div className={`${styles.sideBox} ${styles.button}`}>
                    Revert
                    <i className="fas fa-redo-alt" />
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
                return (
                    <div className={styles.row}>
                        <span>You followed</span>
                        <a className={styles.user} href={`https://instagram.com/${activity.username}`} target="_blank">
                            <div style={{ backgroundImage: `url(${activity.avatar_url})` }} className={styles.avatar} />
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
        const titlePhrase = activity.activity === ActivityType.Comment
            ? `You commented ${!activity.asset_url ? "on a post" : ""}`
            : `You liked ${!activity.asset_url ? "a post" : ""}`

        return (
            <div className={styles.column}>
               {titlePhrase}
               {activity.activity === ActivityType.Comment && <q className={styles.comment}>{activity.text}</q>}
                {activity.asset_url
                    ? (
                        <a
                            href={`https://instagram.com/p/${activity.shortcode}`}
                            target="_blank"
                            style={{ backgroundImage: `url(${activity.asset_url})` }}
                            className={styles.media}
                        />
                    )
                    : <a className={styles.link} href={`https://instagram.com/p/${activity.shortcode}`} target="_blank">View post</a>
                }
            </div>
        );
    }
}
