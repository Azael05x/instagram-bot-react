import * as React from "react";
import { connect } from "react-redux";
import { selectToasts } from "./ducks/selectors";
import { ToastItem } from "./ducks/state";
import { hideToastAction } from "./ducks/actions";

import * as styles from "./Toast.scss";

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
    public toastLifeTime = 2000;
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

        const { toast } = this;

        const className = `${styles.container}
            ${styles[toast.animation]}
            ${this.state.showMessage && styles.active}
            ${styles[toast.type]}
        `;

        return (
            <div
                className={className}
                ref={this.setToastReft}
                onTransitionEnd={this.onTransitionEnd}
                data-active={this.state.showMessage}
            >
               {toast.message}
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
