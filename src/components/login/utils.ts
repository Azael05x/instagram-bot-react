import { ErrorCode } from "./types";

export function getErrorMessage(error: ErrorCode) {
    switch(error) {
        case ErrorCode.InternalServerError: {
            return "Seems that the credentials are invalid. Please check your email and password!"
        }
        case ErrorCode.Unauthorized: {
            return "Seems that there's a typo in the password. Please check it!"
        }
        default:
            return "Aww, sorry for this. An unexpected error occurred. Please try again later!"
    }
}