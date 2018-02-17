export enum ActivityType {
    Like = "like",
    Follow = "follow",
    Unfollow = "unfollow",
    Comment = "comment",
}
export interface GeneralActivity {
    id: number;
    instagram_id: number;
    created_at: string;
    created_at_ms: string;
    reverted_at: string;
    updated_at: string;
}
export interface FollowActivity extends GeneralActivity {
    activity: ActivityType.Follow;
    avatar_url: string;
    user_id: string;
    username: string;
}

export interface CommentActivity extends GeneralActivity {
    activity: ActivityType.Comment;
    asset_url: string;
    media_id: string;
    shortcode: string;
    text: string;
}

export interface LikeActivity extends GeneralActivity {
    activity: ActivityType.Like;
    asset_url: string | null;
    caption: string;
    media_id: string;
    shortcode: string;
}
