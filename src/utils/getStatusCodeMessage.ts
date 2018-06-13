import { StatusCode } from "../types/types";

export function getStatusCodeMessage(status: StatusCode) {
    switch(status) {
        case StatusCode.InternalServerError: {
            return "Seems that the credentials are invalid. Please check your email and password!";
        }
        case StatusCode.Unauthorized: {
            return "Seems that there's a typo in the password. Please check it!";
        }
        case StatusCode.UnprocessableEntity: {
            return "The password seems incorrect. Please try again!";
        }
        default:
            return "Aww, sorry for this. An unexpected error occurred. Please try again later!";
    }
}
