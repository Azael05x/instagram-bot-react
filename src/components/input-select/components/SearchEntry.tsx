import * as React from "react";
import * as styles from "./SearchEntry.scss";

export interface SearchEntryProps {
    name: string;
    mediaCount: number;
    onClick: (value: string) => void;
}

export class SearchEntry extends React.PureComponent<SearchEntryProps> {
    public render() {
        const {
            name,
            mediaCount,
        } = this.props;
        return (
            <div className={styles.container} onClick={this.onClick}>
                <span className={styles.name}>{name}</span>
                <span className={styles.mediaCount}>#{mediaCount}</span>
            </div>
        );
    }
    private onClick = () => {
        this.props.onClick(this.props.name);
    }
}
