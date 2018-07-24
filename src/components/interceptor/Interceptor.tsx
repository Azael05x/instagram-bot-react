import * as React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios, { AxiosError } from "axios";

import { Path } from "@types";
import { showToastAction } from "../toast/ducks/actions";
import { ToastType } from "../toast/ducks/state";

export interface InterceptorState {
    redirectTo?: Path;
}
export interface InterceptorDispatchProps {
    showToast: typeof showToastAction;
}

export type InterceptorProps = InterceptorDispatchProps;

export class Interceptor extends React.PureComponent<InterceptorProps, InterceptorState> {
    public state: InterceptorState = {
        redirectTo: undefined,
    };

    public componentDidMount() {
        axios.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                if (error.response.status === 401) {
                    // FIXME: because of location reload toast is not showing
                    this.props.showToast(
                        error.response.statusText,
                        ToastType.Error,
                    );
                    this.setRedirect();
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
    private setRedirect = () => {
        localStorage.removeItem("email");
        this.setState({
            redirectTo: Path.Login,
        }, this.resetState);
    }
    private resetState = () => {
        this.setState({
            redirectTo: undefined,
        });
        window.location.reload();
    }
}

const mapDispatchToProps: InterceptorDispatchProps = {
    showToast: showToastAction,
};

export const InterceptorConnected = connect<{}, InterceptorDispatchProps>(
    null,
    mapDispatchToProps
)(Interceptor);
