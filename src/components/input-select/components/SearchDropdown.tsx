import * as React from "react";
import { isUserSearch } from "../utils";
import { SearchEntry } from "./SearchEntry";
import { SearchTagItem, SearchUserItem } from "@types";

import * as styles from "./SearchDropdown.scss";

export interface SearchDropdownProps {
    searchResults: SearchTagItem[] | SearchUserItem[];
    isLoading: boolean;
    isDropdownOpen: boolean;
    onSearchClick: (value: string) => void;
    dropDownId: string;
}

export class SearchDropdown extends React.PureComponent<SearchDropdownProps> {
    public render() {
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
            onSearchClick,
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
                        onClick={onSearchClick}
                    />
                ));
        } else {
            searchResultComponents = searchResults
                .map((result, i) => (
                    <SearchEntry
                        key={i}
                        name={result.name}
                        mediaCount={result.mediaCount}
                        onClick={onSearchClick}
                    />
                ));
        }

        return searchResultComponents;
    }
}
