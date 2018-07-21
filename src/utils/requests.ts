// tslint:disable:max-line-length

import axios, { AxiosResponse } from "axios";
import {
    BASE_URL,
    ACCOUNT_URL,
    ACTIVITY_URL,
    GENERAL_URL,
    COMMENT_URL,
    ACTIVITY_BASE,
    ACTIVITY_REVERT,
    ACTIVITY_REVIEWED,
    REGISTER_URL,
    LINK,
    LOGOUT,
} from "@consts";
import { createConfig } from "./config";
import { AccountData } from "../middleware/types";

export function getInitAccountData(): Promise<AxiosResponse<AccountData[]>> {
    return axios.get(`${BASE_URL}${ACCOUNT_URL}`, createConfig());
}
export function getAccountData(id: number): Promise<AxiosResponse<AccountData>> {
    return axios.get(`${BASE_URL}${ACCOUNT_URL}/${id}`, createConfig());
}
export function postAccount(data: { username: string; password: string; }): Promise<AxiosResponse<AccountData>> {
    return axios.post(`${BASE_URL}${ACCOUNT_URL}`, data, createConfig());
}
export function deleteAccount(id: number): Promise<AxiosResponse<void>> {
    return axios.delete(`${BASE_URL}${ACCOUNT_URL}/${id}`, createConfig());
}
export function updateActivities(id: number, data: any) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}${ACTIVITY_URL}`,
        data,
        createConfig(),
    );
}
export function updateGeneral(id: number, data: any) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}${GENERAL_URL}`,
        data,
        createConfig(),
    );
}
export function updateComments(id: number, data: any) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}${COMMENT_URL}`,
        data,
        createConfig(),
    );
}
export function setAccountStatus(id: number, data: any) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}`,
        data,
        createConfig(),
    );
}
export type RequestActivityType = "likes" | "comments" | "follows";

export function getActivities(
    id: number,
    batchSize: number,
    timestamp: number,
    returnReviewed: boolean,
    activityType: RequestActivityType,
) {
    return axios.get(
        `${BASE_URL}${ACCOUNT_URL}/${id}${ACTIVITY_BASE}/${activityType}?batch_size=${batchSize}&from=${timestamp}&return_reviewed=${returnReviewed}`,
        createConfig(),
    );
}
export function setReviewed(
    id: number,
    activityType: RequestActivityType,
    timestamp: number,
) {
    return axios.post(
        `${BASE_URL}${ACCOUNT_URL}/${id}${ACTIVITY_BASE}/${activityType}${ACTIVITY_REVIEWED}`,
        {
            ms: timestamp,
        },
        createConfig(),
    );
}

export function revertAccountActivity(id: number, data: any) {
    return axios.post(`${BASE_URL}${ACCOUNT_URL}/${id}${ACTIVITY_REVERT}`, data, createConfig());
}

export function relinkAccount(id: number, data: { password: string }) {
    return axios.post(`${BASE_URL}${ACCOUNT_URL}/${id}${LINK}`, data, createConfig());
}
export function registerUser(data: { email: string, password: string }) {
    return axios.post(REGISTER_URL, data, createConfig());
}
export function searchUsers(id: number, name: string) {
    return axios.post(
        `${BASE_URL}${ACCOUNT_URL}/${id}/search/user`,
        { name },
        createConfig(),
    );
}
export function searchTags(id: number, name: string) {
    return axios.post(
        `${BASE_URL}${ACCOUNT_URL}/${id}/search/tag`,
        { name },
        createConfig(),
    );
}

export async function logout() {
    return axios.delete(
        `${BASE_URL}${LOGOUT}`,
        createConfig()
    );
}
