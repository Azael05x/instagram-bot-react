import * as React from "react";
import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import { logoutActionCreator, openPopupAction } from "@ducks/actions";

import { ToastType } from "../toast/ducks/type";
import { showToastAction } from "../toast/ducks/actions";
import { createReloginPopup } from "../popup/factory/PopupFactory";
import { ReloginConnected } from "../relogin/Relogin";
import { getAccountData } from "@utils/requests";
import { getAccountIdFromParams } from "@utils/location";

const VERIFICATION_REDIRECT_FAILED_CODE = 406;
const UNAUTHORIZED_CODE = 401;
const LOGIN_ERROR_CODE = 418;

export const setupInterceptors = (dispatch: Dispatch<any>) => {
    /**
     * Intercepts axios requests
     * If 401 status code is returned
     * we have to logout and redirect user
     * to the login page
     */
    axios.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            switch(error && error.response && error.response.status) {
                case UNAUTHORIZED_CODE: {
                    dispatch(logoutActionCreator() as any); // FIXME: fix types
                    dispatch(showToastAction(
                        error.response.statusText,
                        ToastType.Error,
                    ));

                    break;
                }
                case LOGIN_ERROR_CODE: {
                    dispatch(showToastAction(
                        error.response.data || error.response.statusText,
                        ToastType.Error,
                    ));

                    break;
                }
                case VERIFICATION_REDIRECT_FAILED_CODE: {
                    const response = await getAccountData(getAccountIdFromParams());

                    dispatch(openPopupAction(createReloginPopup({
                        content: (
                            <ReloginConnected
                                username={response.data.username}
                                id={response.data.id}
                                isVerificationNeeded={false}
                            />
                        ),
                    })));

                    break;
                }
                case 409: {
                    // TODO: Handle 409 error
                    // tslint:disable-next-line:no-console
                    console.log(error, error.response);
                    const {
                        statusText,
                        // challengeUrl,
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
