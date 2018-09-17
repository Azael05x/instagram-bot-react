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
            switch(error.response.status) {
                case 401: {
                    dispatch(logoutActionCreator() as any); // FIXME: fix types
                    dispatch(showToastAction(
                        error.response.statusText,
                        ToastType.Error,
                    ));

                    break;
                }
                case 409: {
                    // TODO: Handle 409 error
                    console.log(error, error.response)
                    const {
                        statusText,
                        challengeUrl,
                    } = error.response && error.response.data;

                    dispatch(showToastAction(
                        statusText,
                        ToastType.Error,
                    ));
                    break;
                }
            }

            return Promise.reject(error);
        }
    );
};
