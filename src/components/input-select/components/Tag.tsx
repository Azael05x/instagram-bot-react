import * as React from "react";
import { TagRemoveSVG } from "../../icons/TagRemove";

import * as styles from "./Tag.scss";

export interface TagProps {
    value: string;
    onRemove: () => void;
}
export class Tag extends React.Component<TagProps> {
    public shouldComponentUpdate(nextProps: TagProps) {
        return nextProps.value !== this.props.value;
    }
   public render() {
        return (
            <div className={styles.tag}>
                {this.props.value}
                {" "}
                <div onClick={this.props.onRemove} className={styles.closeIcon}>
                    <TagRemoveSVG />
                </div>
            </div>
        );
    }
}
