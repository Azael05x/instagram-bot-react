import * as React from "react";
import * as styles from "./Option.css";

export interface OptionsProps {
    onClick: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    label: string;
    dataRole: string;
}

export class Option extends React.PureComponent<OptionsProps> {
    render() {
        const { dataRole, label, onClick} = this.props;

        return (
            <div
                className={styles.navigationOption}
                data-role={dataRole}
                onClick={onClick}
                onTouchEnd={onClick}
            >
                {label}
            </div>
        );
    }
}
