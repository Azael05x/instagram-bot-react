export interface AccountLinkData {
    created_at: string;
    id: number;
    is_active: boolean;
    settings: {
        activities: {
            speed: 1,
            enabled_likes: false,
            enabled_follows: false,
            enabled_unfollows: false,
        };
    };
    updated_at: string
    url: string;
    username: string;
}
