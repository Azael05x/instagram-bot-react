import * as React from "react";
import * as styles from "./Tag.css";

export interface TagProps {
    value: string;
    onRemove: () => void;
}
export class Tag extends React.PureComponent<TagProps> {
    render() {
        return (
            <div className={styles.tag}>
                {this.props.value}
                {" "}
                <i className={`${styles.closeIcon} fa fa-times`} aria-hidden="true" onClick={this.props.onRemove} />
            </div>
        );
    }
}
