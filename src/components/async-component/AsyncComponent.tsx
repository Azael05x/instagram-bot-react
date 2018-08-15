import * as React from "react";
import { Loading } from "../loading/Loading";
import { RouteComponentProps } from "react-router-dom";

export interface AsyncComponentOwnProps {
    moduleProvider: () => Promise<any>;
}
export type AsyncComponentProps = AsyncComponentOwnProps & Partial<RouteComponentProps<{}>>;
export interface AsyncComponentState {
    Component: React.ComponentClass<any>;
}

export class AsyncComponent extends React.PureComponent<AsyncComponentProps, AsyncComponentState> {
    public state: AsyncComponentState = {
        Component: null,
    };

    async componentWillMount() {
        if(!this.state.Component) {
            const Component = await this.props.moduleProvider();
            this.setState({ Component: Component.default });
        }
    }

    render() {
        const { Component } = this.state;
        const {
            moduleProvider,
            ...rest
        } = this.props;

        return <>
                {Component
                    ? <Component {...rest} />
                    : <Loading />
                }
        </>;
    }
}
