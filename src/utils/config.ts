import { AxiosRequestConfig } from "axios";

export function createConfig(options: AxiosRequestConfig = {}): AxiosRequestConfig {
    return {
        ...options,
        withCredentials: true,
    };
}
