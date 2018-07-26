import * as React from "react";
import { connect } from "react-redux";
import { selectToasts } from "./ducks/selectors";
import { hideToastAction } from "./ducks/actions";
import {
    ToastMessageComposed,
    ToastItem,
} from "./ducks/type";

import * as styles from "./Toast.scss";

function isComponent(toastMessage: JSX.Element | ToastMessageComposed): toastMessage is JSX.Element {
    return !(toastMessage as ToastMessageComposed).top;
}

export interface ToastStateProps {
    toasts: ToastItem[];
}
export interface ToastDispatchProps {
    hideToast: typeof hideToastAction;
}

export type ToastProps = ToastStateProps & ToastDispatchProps;

export interface ToastState {
    showMessage: boolean;
    unMount: boolean;
}

export class Toast extends React.PureComponent<ToastProps, ToastState> {
    public state: ToastState = {
        showMessage: false,
        unMount: true,
    };
    public toastLifeTime = 5000;
    public toastShowDelay = 100;
    public toast: ToastItem;
    public showToastTimeoutId: number;
    public hideToastTimeoutId: number;
    public toastRef: HTMLElement | null = null;

    public componentDidUpdate(prevProps: ToastProps) {
        const { toasts } = this.props;
        const toast = toasts[0];

        if (toast && (toast.id !== (prevProps.toasts[0] && prevProps.toasts[0].id))) {
            this.toast = toast;
            this.showToast();
        }
    }
    public render() {
        if (this.state.unMount) {
            return null;
        }

        const {
            toast: {
                message: toastMessage,
                animation,
                type,
            },
        } = this;

        const className = `${styles.container}
            ${styles[animation]}
            ${this.state.showMessage && styles.active}
            ${styles[type]}
        `;

        let message: string | JSX.Element;

        if (typeof toastMessage === "string" || isComponent(toastMessage)) {
            message = toastMessage;
        } else {
            message = <>
                {toastMessage.top}
                <br />
                {toastMessage.bottom}
            </>;
        }

        return (
            <div
                className={className}
                ref={this.setToastReft}
                onTransitionEnd={this.onTransitionEnd}
                data-active={this.state.showMessage}
            >
               {message}
            </div>
        );
    }
    private onTransitionEnd = (event: React.TransitionEvent<HTMLElement>) => {
        if (event.currentTarget.getAttribute("data-active") === "false") {
            window.clearTimeout(this.showToastTimeoutId);
            window.clearTimeout(this.hideToastTimeoutId);
            this.props.hideToast();
            this.toast = undefined;
            this.setState({
                unMount: true,
            });
        }
    }
    private hideToast = () => {
        this.hideToastTimeoutId = window.setTimeout(() => {
            window.clearTimeout(this.showToastTimeoutId);

            this.setState({
                showMessage: false,
            });
        }, this.toastLifeTime);
    }
    private showToast = () => {
        this.setState({
            unMount: false,
        });

        this.showToastTimeoutId = window.setTimeout(() =>{
            this.setState({
                showMessage: true,
            }, this.hideToast);
        }, this.toastShowDelay);
    }
    private setToastReft = (ref: HTMLElement | null) => {
        if (ref) {
            this.toastRef = ref;
        }
    }
}

const mapDispatchToProps: ToastDispatchProps = {
    hideToast: hideToastAction,
};
const mapStateToProps = (state: any): ToastStateProps => ({
    toasts: selectToasts(state),
});

export const ToastConnected = connect<ToastStateProps, ToastDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Toast);
