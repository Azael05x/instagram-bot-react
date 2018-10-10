import * as React from "react";
import * as styles from "./Switch.scss";
import * as classnames from "classnames";

export interface SwitchState {
    isActive: boolean;
}
export interface SwitchProps {
    value: boolean;
    onToggle?: (value: boolean) => void;
}
export class Switch extends React.PureComponent<SwitchProps, SwitchState> {
    state: SwitchState = {
        isActive: !!this.props.value,
    };

    public render() {
        const containerClassname = classnames(styles.container, {[styles.active]: this.state.isActive});
        const sliderClassname = classnames(styles.slider, {[styles.active]: this.state.isActive});

        return (
            <div className={containerClassname}>
                <div className={sliderClassname} onClick={this.onToggle} />
            </div>
        );
    }
    private onToggle = () => {
        const isActive = !this.state.isActive;
        this.setState({ isActive });
        this.props.onToggle(isActive);
    }
}
