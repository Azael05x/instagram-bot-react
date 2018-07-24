import * as React from "react";
import { Redirect } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { Path } from "@types";

export interface InterceptorState {
    redirectTo?: Path;
}

export class Interceptor extends React.PureComponent<{}, InterceptorState> {
    public state: InterceptorState = {
        redirectTo: undefined,
    };

    public componentWillMount() {
        axios.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                if (error.response.status === 401) {
                    this.setState({
                        redirectTo: Path.Login,
                    }), this.resetState;
                }

                return Promise.reject(error);
            }
        );

    }
    public render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} exact />;
        }

        return null;
    }
    private resetState = () => {
        this.setState({
            redirectTo: undefined,
        });
    }
}
