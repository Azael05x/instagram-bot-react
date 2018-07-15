import { AxiosRequestConfig } from "axios";

export function createConfig(options = {}): AxiosRequestConfig {
    return {
        withCredentials: true,
        ...options,
    };
}
