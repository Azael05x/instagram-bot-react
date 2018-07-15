import * as React from "react";
import { AxiosResponse } from "axios";
import { debounce } from "lodash";

import { ENTER_KEY } from "../../consts";
import { Tag } from "./components/Tag";
import { cleanTags, cleanTextArea } from "../../utils/cleanTag";
import { getUniqueId } from "../../utils/uniqueId";
import { Divider, DividerTheme } from "../divider/Divider";
import {
    SearchBody,
    SearchTagItem,
    SearchUserItem,
    InputClickTargetEvent,
} from "../../types/types";
import { SearchEntry } from "./components/SearchEntry";
import {
    sortTagSearchResult,
    sortUserSearchResult,
    checkDuplicateTagResult,
    checkDuplicateUsersResult,
    isUserSearch,
} from "./utils";

import * as styles from "./InputSelect.scss";

export enum InputType {
    TextField,
    SingleLine,
}
export interface InputSelectState {
    value: string;
    tags: string[];
    searchResults: SearchTagItem[] | SearchUserItem[];
    loading: boolean;
    isDropdownOpen: boolean;
}
export interface InputSelectProps {
    placeholder: string;
    bodyPlaceholder: string;
    onSubmit: (value: string[]) => void;
    onChange?: (value: string) => Promise<AxiosResponse<SearchBody<SearchTagItem, SearchUserItem>>>;
    icon?: JSX.Element;
    tags?: string[]; // Tags that could already be associated with the account
    type?: InputType;
}

/*
    Throttle search requests to minmize lag
    Minimize request amount per timeout
 */
const searchThrottleTimeout = 300;
const throttledSearchCb = debounce(async (
    value: string,
    onChange: (value: string) => Promise<AxiosResponse<SearchBody<SearchTagItem, SearchUserItem>>>,
    setSearchResults: (result: SearchUserItem[] | SearchTagItem[]) => void,
    loadingCb?: () => void,
) => {
    const { data: { body: { result }} } = await onChange(value);

    /**
     * If the API fails the result can be undefined
     * FIXME:
     * @var result shows as not possibly being undefined, but it can
     */
    if (result) {
        loadingCb && loadingCb();
        setSearchResults(result);
    }
}, searchThrottleTimeout, { trailing: true, leading: true});

export class InputSelect extends React.Component<InputSelectProps, InputSelectState> {
    public static defaultProps = {
        type: InputType.SingleLine,
    };
    public state: InputSelectState = {
        value: "",
        tags: this.props.tags || [],
        searchResults: [],
        loading: false,
        isDropdownOpen: false,
    };
    /**
        Differentiates between single line inputs (e.g. hashtags, users)
        and multiline text areas for comments

        Also, required for cleaning the user input
     */
    private isSingleLine = this.props.type === InputType.SingleLine;
    private dropdownId = `${getUniqueId()}`; // String because compared to data-id which returns a string
    public componentDidMount() {
        /*
            Event listener for managing closing dropdown
            when clicking outside the adjacent input fieldor the dropdown itself
        */
        if (this.isSingleLine) {
            window.addEventListener("click", this.dropdownCloseMouseEventCb);
            window.addEventListener("touchstart", this.dropdownCloseMouseEventCb);
        }
    }
    public componentWillUnmount() {
        window.removeEventListener("click", this.dropdownCloseMouseEventCb);
        window.removeEventListener("touchstart", this.dropdownCloseMouseEventCb);
    }

    public render() {
        const {
            placeholder,
            icon,
            bodyPlaceholder,
        } = this.props;
        const {
            value,
            tags,
            loading,
        } = this.state;

        const inputComponent = this.isSingleLine
            ? (
                <input
                    value={value}
                    onChange={this.onInput}
                    className={styles.input}
                    placeholder={placeholder}
                    onKeyUp={this.onEnterKey}
                    data-id={this.dropdownId}
                />
            )
            : (
                <textarea
                    cols={40}
                    rows={5}
                    value={value}
                    onChange={this.onInput}
                    className={styles.input}
                    placeholder={placeholder}
                    onKeyUp={this.onEnterKey}
                />
            );

        /**
         * Left side icon for input indicating purpose
         */
        const iconComponent = icon && (
            <div className={styles.iconContainer}>
                {icon}
            </div>
        );

        return (
            <div className={styles.container}>
                <div className={styles.inputWrapper}>
                    {iconComponent}
                    {inputComponent}
                    <div className={`${styles.spinner} ${loading && styles.active}`}>
                        <i className="fas fa-spinner" />
                    </div>
                    {this.isSingleLine && this.renderDropdown()}
                </div>
                <Divider theme={DividerTheme.Small} />
                <div className={styles.tagField}>
                    {tags.length
                        ? this.rendertags()
                        : <div className={styles.bodyPlaceholder}>{bodyPlaceholder}</div>
                    }
                </div>
            </div>
        );
    }
    private onInput = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        this.setState({ value });

        if (this.props.onChange) {
            if (!value || value.length <= 2) {
                this.setState({
                    isDropdownOpen: false,
                    searchResults: [],
                    loading: false,
                });
            } else {
                !this.state.isDropdownOpen && this.setState({
                    isDropdownOpen: true,
                });
                throttledSearchCb(
                    value,
                    this.props.onChange,
                    this.setSearchResults,
                    !this.state.loading ? () => this.setLoading(true) : undefined,
                );
            }
        }
    }
    private setSearchResults = (result: SearchUserItem[] | SearchTagItem[]) => {
        let searchResults: SearchTagItem[] | SearchUserItem[];
        if (isUserSearch(result)) {
            searchResults = checkDuplicateUsersResult(
                this.state.tags,
                sortUserSearchResult(result).slice(0, 10),
            );
        } else {
            searchResults = checkDuplicateTagResult(
                this.state.tags,
                sortTagSearchResult(result).slice(0, 10),
            );
        }

        !searchResults.length && this.setState({
            isDropdownOpen: false,
        });
        this.setState({ searchResults }, () => this.setLoading(false));
    }
    private setLoading = (value: boolean) => {
        this.setState({
            loading: value,
        });
    }
    private onEnterKey = (key: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (key.keyCode === ENTER_KEY && this.state.value) {
            this.onSubmit();
        }
    }
    private cleanTags = (value: string) => {
        return this.isSingleLine ? cleanTags(value) : cleanTextArea(value);
    }
    private onSubmit = () => {
        const { value, tags } = this.state;
        const cleanValue = this.cleanTags(value);

        /*
            cleanValue can be a string
            if the interaction is being done with  text area
        */
        if (typeof cleanValue === "string") {
            if (cleanValue && !tags.includes(cleanValue)) {
                this.setNewTags([...tags, cleanValue]);
            }
        } else {
            /*
                The input was made for tags or users
             */
            const newTags: string[] = [];
            for (const tag of cleanValue) {
                if (tag && !tags.includes(tag)) {
                    newTags.push(tag);
                }
            }

            if (newTags.length) {
                this.setNewTags([...tags, ...newTags]);
            }
        }

        this.setLoading(false);
        this.closeDropdown();
    }
    // Index comes from binding the method in rendertags
    private onRemoveTag = (i: number) => {
        return () => {
            const newTags = [...this.state.tags];
            newTags.splice(i, 1);

            this.setState({
                tags: newTags,
            }, () => {
                this.props.onSubmit(newTags);
            });
        };
    }
    private rendertags = () => {
        return this.state.tags
            .map((tag: string, i: number) => <Tag key={i} value={tag} onRemove={this.onRemoveTag(i)} />);
    }
    private setNewTags = (updatedTags: string[]) => {
        this.setState({
            value: "",
            tags: updatedTags
        }, () => {
            this.props.onSubmit(updatedTags);
        });
    }
    private renderDropdown = () => {
        const {
            searchResults,
            loading,
            isDropdownOpen,
        } = this.state;
        let searchResultComponents: JSX.Element[];

        if (isUserSearch(searchResults)) {
            searchResultComponents = searchResults
                .map((result, i) => (
                    <SearchEntry
                        key={i}
                        name={result.username}
                        mediaCount={result.followerCount}
                        onClick={this.onSearchClick}
                    />
                ));
        } else {
            searchResultComponents = searchResults
                .map((result, i) => (
                    <SearchEntry
                        key={i}
                        name={result.name}
                        mediaCount={result.mediaCount}
                        onClick={this.onSearchClick}
                    />
                ));
        }

        return (
            <div
                className={`
                    ${styles.searchDropdown}
                    ${isDropdownOpen && !loading && styles.active}
                `}
                data-id={this.dropdownId}
            >
                {searchResultComponents}
            </div>
       );
    }
    private onSearchClick = (value: string) => {
        /*
            No cleaning  or additional checking required.
            Cleaning already done before displaying search results
        */
       if (!this.state.tags.includes(value)) {
            this.closeDropdown();
            this.setNewTags([...this.state.tags, value]);
        }
    }
    private closeDropdown = () => {
        this.setState({
            isDropdownOpen: false,
        });
    }
    private dropdownCloseMouseEventCb = (event: InputClickTargetEvent) => {
        if(this.state.isDropdownOpen && this.dropdownId !== event.target.dataset.id) {
            this.closeDropdown();
        }
    }
}
