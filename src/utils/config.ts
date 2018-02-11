import { AxiosRequestConfig } from "axios";

export function createConfig(userAuthToken: string, options = {}): AxiosRequestConfig {
    return {
        headers: {
            "Authorization": userAuthToken,
        },
        ...options,
    };
}
