import * as React from "react";
import { isUserSearch } from "../utils";
import { SearchEntry } from "./SearchEntry";
import { SearchTagItem, SearchUserItem } from "@types";

import * as styles from "./SearchDropdown.scss";

export interface SearchDropdownProps {
    searchResults: SearchTagItem[] | SearchUserItem[];
    isLoading: boolean;
    isDropdownOpen: boolean;
    onSearchResultSelect?: (value: string) => void;
    dropDownId: string;
}

export class SearchDropdown extends React.PureComponent<SearchDropdownProps> {
    public render() {
        if (!this.props.isDropdownOpen) {
            return null;
        }

        const {
            isLoading,
            isDropdownOpen,
            dropDownId,
        } = this.props;

        return (
            <div
                className={`
                    ${styles.searchDropdown}
                    ${isDropdownOpen && !isLoading && styles.active}
                `}
                data-id={dropDownId}
            >
                {this.getResultComponent()}
            </div>
       );
    }
    private getResultComponent = () => {
        const {
            searchResults,
            onSearchResultSelect,
        } = this.props;
        let searchResultComponents: JSX.Element[];
        /**
         * Render search dropdown with
         * all the rows rendered
         */
        if (isUserSearch(searchResults)) {
            searchResultComponents = searchResults
                .map((result, i) => (
                    <SearchEntry
                        key={i}
                        name={result.username}
                        mediaCount={result.followerCount}
                        onSearchResultSelect={onSearchResultSelect}
                    />
                ));
        } else {
            searchResultComponents = searchResults
                .map((result, i) => (
                    <SearchEntry
                        key={i}
                        name={result.name}
                        mediaCount={result.mediaCount}
                        onSearchResultSelect={onSearchResultSelect}
                    />
                ));
        }

        return searchResultComponents;
    }
}
