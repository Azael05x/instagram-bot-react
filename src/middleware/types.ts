/**
 * Types within an Account.
 * Needs to be up to date with Backend
 */
export type MediaType = "all" | "photo" | "video";

export interface CommentsLikesGeneral {
    maximumComments: number;
    maximumLikes: number;
    minimumLikes: number;
    minimumComments: number;
    mediaAge: number;
    mediaType: MediaType;
}
export interface Comments extends CommentsLikesGeneral {
    imageComments: string[];
    videoComments: string[];
}
export type Likes = CommentsLikesGeneral;

/**
 * type index number
 */
export enum ActivitySpeedType {
    Slow = 1,
    Medium = 2,
    Fast = 3,
}
/**
 * Follow time in mutes
 */
export enum FollowTimeType {
    Slow = 1440,
    Medium = 2880,
    Fast = 4320,
}

export interface Activities {
    speed: ActivitySpeedType;
    enabledLikes: boolean;
    enabledFollows: boolean;
    enabledUnfollows: boolean;
    enabledComments: boolean;
}
export interface Follows  {
    maximumFollowers: number;
    minimumFollowers: number;
    unfollowAfterMinutes: number;
}
export interface General {
    blacklistedTags: string[];
    blacklistedUsers: string[];
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
    createdAt: string;
    id: number;
    isActive: boolean;
    settings: Settings;
    updatedAt: string;
    username: string;
    hasInvalidSession: boolean;
    verificationChoice: string | null;
    verificationUrl: string | null;
}
