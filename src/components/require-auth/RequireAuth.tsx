import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { selectUser } from "@ducks/selectors";
import { Module } from "@types";
import { AsyncComponent } from "../async-component/AsyncComponent";

export interface RequireAuthStateProps {
    isLogged: boolean;
}
export type RequireAuthProps = RequireAuthStateProps & RouteComponentProps<{}> & { moduleProvider: Module };

/**
 *  Handles whether the Route is accessible
 * to the user.
 *
 * Especially useful if the server sends 401 status
 */
export function RequireAuth(module: Module) {
    class RequireAuthComponent extends React.Component<RequireAuthProps> {
        public componentWillMount() {
            if(!this.props.isLogged) {
                this.props.history.push("/login");
            }
        }

        public componentDidUpdate() {
            if(!this.props.isLogged) {
                this.props.history.push("/login");
            }
        }

        public render() {
            return <AsyncComponent {...this.props} moduleProvider={module} />;
        }
    }

    const mapStateToProps = (state: any): RequireAuthStateProps => {
        return {
            isLogged: !!selectUser(state).email,
        };
    };

    return connect<RequireAuthStateProps>(mapStateToProps)(RequireAuthComponent);
}
