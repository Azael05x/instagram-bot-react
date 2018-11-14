import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Loading } from "../loading/Loading";
import { windowScrollTo } from "@utils/scrollTo";

export interface AsyncComponentOwnProps {
    props?: any;
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

    /**
     * Used to avoid setState on an unmounted
     * component. React had this in prev versions
     * but deprecated.
     *
     * Should not be used for timeouts and such,
     * however, Promises are different e.g. they
     * can't be cancelled like timeouts can
     */
    private _isMounted = false;

    public componentDidMount() {
        this._isMounted = true;

        if(!this.state.Component) {
            this.replaceModule();
        }
    }

    public componentDidUpdate() {
        this.replaceModule();
    }

    private replaceModule = async () => {
        const Component = await this.props.moduleProvider();

        if (this._isMounted) {
            this.setState({ Component: Component.default },  () => windowScrollTo());
        }
    }

    public componentWillUnmount() {
        this._isMounted = false;
    }

    public render() {
        const {
            moduleProvider,
            props,
            ...rest
        } = this.props;

        return <>
                {this.state.Component
                    ? <this.state.Component {...rest} {...props} />
                    : <Loading />
                }
        </>;
    }
}
