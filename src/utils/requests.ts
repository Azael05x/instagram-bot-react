import axios, { AxiosRequestConfig } from "axios";
import {
    BASE_URL,
    ACCOUNT_URL,
    ACTIVITY_URL,
    GENERAL_URL,
    COMMENT_URL,
    ACTIVITIES_ALL,
} from "../consts";

export function getInitAccountData(config: AxiosRequestConfig) {
    return axios.get(`${BASE_URL}${ACCOUNT_URL}`, config);
};
export function getAccountData(id: number, config: AxiosRequestConfig) {
    return axios.get(`${BASE_URL}${ACCOUNT_URL}/${id}`, config);
};
export function postAccount(data: any, config: AxiosRequestConfig) {
    return axios.post(`${BASE_URL}${ACCOUNT_URL}`, data, config);
};
export function deleteAccount(id: number, config: AxiosRequestConfig) {
    return axios.delete(`${BASE_URL}${ACCOUNT_URL}/${id}`, config)
};
export function updateActivities(id: number, data: any, config: AxiosRequestConfig) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}${ACTIVITY_URL}`,
        data,
        config,
    )
};
export function updateGeneral(id: number, data: any, config: AxiosRequestConfig) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}${GENERAL_URL}`,
        data,
        config,
    )
};
export function updateComments(id: number, data: any, config: AxiosRequestConfig) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}${COMMENT_URL}`,
        data,
        config,
    )
};
export function setAccountStatus(id: number, data: any, config: AxiosRequestConfig) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}`,
        data,
        config,
    )
};
export function getActivities(id: number, config: AxiosRequestConfig) {
    return axios.get(`${BASE_URL}${ACCOUNT_URL}/${id}${ACTIVITIES_ALL}`, config)
};
