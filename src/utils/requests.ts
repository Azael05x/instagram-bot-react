// tslint:disable:max-line-length

import axios from "axios";
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
} from "../consts";
import { createConfig } from "./config";

// Default config. Can be overwritten when using any of the following methods
const defaultConfig = () => createConfig(localStorage.getItem("auth_token"));

export function getInitAccountData(config = defaultConfig) {
    return axios.get(`${BASE_URL}${ACCOUNT_URL}`, config());
}
export function getAccountData(id: number, config = defaultConfig) {
    return axios.get(`${BASE_URL}${ACCOUNT_URL}/${id}`, config());
}
export function postAccount(data: any, config = defaultConfig) {
    return axios.post(`${BASE_URL}${ACCOUNT_URL}`, data, config());
}
export function deleteAccount(id: number, config = defaultConfig) {
    return axios.delete(`${BASE_URL}${ACCOUNT_URL}/${id}`, config());
}
export function updateActivities(id: number, data: any, config = defaultConfig) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}${ACTIVITY_URL}`,
        data,
        config(),
    );
}
export function updateGeneral(id: number, data: any, config = defaultConfig) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}${GENERAL_URL}`,
        data,
        config(),
    );
}
export function updateComments(id: number, data: any, config = defaultConfig) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}${COMMENT_URL}`,
        data,
        config(),
    );
}
export function setAccountStatus(id: number, data: any, config = defaultConfig) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}`,
        data,
        config(),
    );
}
export type RequestActivityType = "likes" | "comments" | "follows";

export function getActivities(
    id: number,
    batchSize: number,
    timestamp: number,
    returnReviewed: boolean,
    activityType: RequestActivityType,
    config = defaultConfig
) {
    return axios.get(
        `${BASE_URL}${ACCOUNT_URL}/${id}${ACTIVITY_BASE}/${activityType}?batch_size=${batchSize}&from=${timestamp}&return_reviewed=${returnReviewed}`,
        config(),
    );
}
export function setReviewed(
    id: number,
    activityType: RequestActivityType,
    timestamp: number,
    config = defaultConfig
) {
    return axios.post(
        `${BASE_URL}${ACCOUNT_URL}/${id}${ACTIVITY_BASE}/${activityType}${ACTIVITY_REVIEWED}`,
        {
            ms: timestamp,
        },
        config(),
    );
}

export function revertAccountActivity(id: number, data: any, config = defaultConfig) {
    return axios.post(`${BASE_URL}${ACCOUNT_URL}/${id}${ACTIVITY_REVERT}`, data, config());
}

export function relinkAccount(id: number, data: { password: string }, config = defaultConfig) {
    return axios.post(`${BASE_URL}${ACCOUNT_URL}/${id}${LINK}`, data, config());
}
export function registerUser(data: { email: string, password: string }) {
    return axios.post(REGISTER_URL, data, defaultConfig());
}
export function searchUsers(id: number, name: string, config = defaultConfig) {
    return axios.post(
        `${BASE_URL}${ACCOUNT_URL}/${id}/search_user`,
        { name },
        config(),
    );
}
export function searchTags(id: number, name: string, config = defaultConfig) {
    return axios.post(
        `${BASE_URL}${ACCOUNT_URL}/${id}/search_tag`,
        { name },
        config(),
    );
}
