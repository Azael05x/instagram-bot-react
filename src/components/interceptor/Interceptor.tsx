import * as React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios, { AxiosError } from "axios";

import { Path } from "@types";
import { selectUser } from "@ducks/selectors";
import { logoutActionCreator } from "@ducks/actions";

import { showToastAction } from "../toast/ducks/actions";
import { ToastType } from "../toast/ducks/state";

export interface InterceptorState {
    redirectTo?: Path;
}
export interface InterceptorStateProps {
    isLogged: boolean;
}
export interface InterceptorDispatchProps {
    showToast: typeof showToastAction;
    logout: typeof logoutActionCreator;
}

export type InterceptorProps = InterceptorDispatchProps & InterceptorStateProps;

export class Interceptor extends React.PureComponent<InterceptorProps, InterceptorState> {
    public state: InterceptorState = {
        redirectTo: undefined,
    };
    private interceptorRef: number | null = null;
    private errorFired = false;

    public componentDidMount() {
        /**
         * Intercepts axios requests
         * If 401 status code is returned
         * we have to logout and redirect user
         * to the login page
         */
        this.interceptorRef = axios.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                if (error.response.status === 401) {
                    this.errorFired = true;
                    this.props.logout();
                    this.props.showToast(
                        error.response.statusText,
                        ToastType.Error,
                    );
                }

                return Promise.reject(error);
            }
        );
    }
    public componentWillReceiveProps(nextProps: InterceptorProps) {
        if (this.props.logout && !nextProps.isLogged && this.errorFired) {
            this.setRedirect();
        }
    }
    public componentWillUnmount() {
        axios.interceptors.request.eject(this.interceptorRef);
    }

    public render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} exact />;
        }

        return null;
    }
    private setRedirect = () => {
        this.setState({
            redirectTo: Path.Login,
        }, this.resetState);
    }
    private resetState = () => {
        this.setState({
            redirectTo: undefined,
        });
        this.errorFired = false;
    }
}

const mapStateToProps = (state: any): InterceptorStateProps => ({
    isLogged: !!selectUser(state).email,
});
const mapDispatchToProps: InterceptorDispatchProps = {
    showToast: showToastAction,
    logout: logoutActionCreator,
};

export const InterceptorConnected = connect<InterceptorStateProps, InterceptorDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(Interceptor);
