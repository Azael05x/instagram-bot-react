import { AxiosRequestConfig } from "axios";

export function createConfig(options = {}): AxiosRequestConfig {
    return {
        ...options,
        withCredentials: true,
    };
}
