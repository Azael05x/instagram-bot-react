/**
 * Types within an Account.
 * Needs to be up to date with Backend
 */
export type MediaType = "all" | "photo" | "video";

export interface CommentsLikesGeneral {
    maximum_comments: number;
    maximum_likes: number;
    minimum_likes: number;
    minimum_comments: number;
    media_age: number;
    media_type: MediaType;
}
export interface Comments extends CommentsLikesGeneral {
    image_comments: string[];
    video_comments: string[];
}
export type Likes = CommentsLikesGeneral;

export enum ActivitySpeedType {
    Slow = 1,
    Medium = 2,
    Fast = 3,
}

export interface Activities {
    speed: ActivitySpeedType;
    enabled_likes: boolean;
    enabled_follows: boolean;
    enabled_unfollows: boolean;
    enabled_comments: boolean;
}
export interface Follows  {
    maximum_followers: number;
    minimum_followers: number;
}
export interface General {
    blacklisted_tags: string[];
    blacklisted_users: string[];
    tags: string[];
    users: string[];
}

export interface Settings {
    activities: Activities;
    comments: Comments;
    likes: Likes;
    follows: Follows;
    general: General;
}

 export interface AccountData {
    created_at: string;
    id: number;
    is_active: boolean;
    settings: Settings;
    updated_at: string;
    url: string;
    username: string;
}
