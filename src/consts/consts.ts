enum Environment {
    Development = "development",
    Production = "production",
    Staging = "staging",
}

let baseUrl;
if (process.env.NODE_ENV === Environment.Development) {
    baseUrl = "http://localhost:8081";
} else if (process.env.NODE_ENV === Environment.Staging) {
    baseUrl = "https://staging-api.gekotta.com";
} else if (process.env.NODE_ENV === Environment.Production) {
    baseUrl = "https://api.gekotta.com";
}

export const BASE_URL = baseUrl;

export const AUTH_BASE = "/auth/login";
export const REGISTER_BASE = "/auth/register";
export const LOGOUT = "/auth/logout";
export const ACCOUNT_URL = "/instagrams";
export const USER_URL = "/user";
export const USER_BALANCE = "/user/balance";
export const PRICING = "/pricing";
export const STATISTICS = "/statistics";
export const ACTIVITY_URL = "/settings/activity";
export const GENERAL_URL = "/settings/general";
export const COMMENT_URL = "/settings/comment"; // min max comments
export const LIKE_URL = "/settings/like"; // min max likes
export const FOLLOW_URL = "/settings/follow"; // min max followers
export const ACTIVITY_BASE = "/activity";
export const ACTIVITY_REVIEWED = "/reviewed";
export const ACTIVITY_REVERT = "/activity/revert";
export const LINK = "/link";
export const LOGIN_URL = BASE_URL + AUTH_BASE;
export const REGISTER_URL = BASE_URL + REGISTER_BASE;

// Keyboard keys
export const ENTER_KEY_CODE = "13";
export const ENTER_KEY_NAME = "Enter";

// Sizes
export const MOBILE_WIDTH = 768;
