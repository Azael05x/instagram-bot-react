import * as React from "react";
import * as styles from "./Switch.css";

export interface SwitchState {
    isActive: boolean;
}
export interface SwitchProps {
    value: boolean;
    onToggle?: (value: boolean) => void;
}
export class Switch extends React.PureComponent<SwitchProps, SwitchState> {
    public constructor(props: SwitchProps) {
        super(props);

        this.state = {
            isActive: !!props.value,
        }
    }
    public render() {
        const containerClassname = `${styles.container} ${this.state.isActive && styles.active}`;
        const sliderClassname = `${styles.slider} ${this.state.isActive && styles.active}`;
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
