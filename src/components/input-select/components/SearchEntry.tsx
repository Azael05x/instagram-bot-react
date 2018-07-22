import * as React from "react";
import * as styles from "./SearchEntry.scss";

export interface SearchEntryProps {
    name: string;
    mediaCount: number;
    onSearchResultSelect?: (value: string) => void;
}

export class SearchEntry extends React.PureComponent<SearchEntryProps> {
    public render() {
        const {
            name,
            mediaCount,
        } = this.props;
        return (
            <div
                className={styles.container}
                onClick={this.onClick}
                onTouchEnd={this.onClick}
            >
                <span className={styles.name}>{name}</span>
                <span className={styles.mediaCount}>#{mediaCount}</span>
            </div>
        );
    }
    private onClick = () => {
        if (this.props.onSearchResultSelect) {
            this.props.onSearchResultSelect(this.props.name);
        }
    }
}
