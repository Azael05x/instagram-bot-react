import * as React from "react";
import * as styles from "./Switch.css";

export interface SwitchState {
    isActive: boolean;
}
export interface SwitchProps {
    onToggle?: () => void;
}
export class Switch extends React.PureComponent<SwitchProps, SwitchState> {
    public constructor(props: SwitchProps) {
        super(props);

        this.state = {
            isActive: false,
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
        this.setState({
            isActive: !this.state.isActive,
        });
        // TODO: uncomment when actual callbacks will be passed
        // this.props.onToggle();
    }
}
