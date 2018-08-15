import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import { logoutActionCreator } from "@ducks/actions";
import { InstaState } from "@types";

import { ToastType } from "../toast/ducks/type";
import { showToastAction } from "../toast/ducks/actions";

export const setupInterceptors = (dispatch: Dispatch<InstaState>) => {
    /**
     * Intercepts axios requests
     * If 401 status code is returned
     * we have to logout and redirect user
     * to the login page
     */
    axios.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (error.response.status === 401) {
                dispatch(logoutActionCreator() as any); // FIXME: fix types
                dispatch(showToastAction(
                    error.response.statusText,
                    ToastType.Error,
                ));
            }

            return Promise.reject(error);
        }
    );
};
