import * as React from "react";
import { AxiosResponse } from "axios";
import { debounce } from "lodash";

import { Tag } from "./components/Tag";
import { cleanTags, cleanTextArea } from "@utils/cleanTag";
import { getUniqueId } from "@utils/uniqueId";
import { Divider, DividerTheme } from "../divider/Divider";
import {
    SearchTagItem,
    SearchUserItem,
    InputClickTargetEvent,
} from "@types";

import {
    sortTagSearchResult,
    sortUserSearchResult,
    checkDuplicateTagResult,
    checkDuplicateUsersResult,
    isUserSearch,
} from "./utils";

import * as styles from "./InputSelect.scss";
import { SearchDropdown } from "./components/SearchDropdown";
import { getPressedKey, isEnterKey } from "@utils/keyboardEvents";
import { SpinnerSVG } from "../icons/Spinner";

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
    cancelTouchEnd: boolean;
}
export interface InputSelectProps {
    placeholder: string;
    bodyPlaceholder: string;
    onSubmit: (value: string[]) => void;
    onChange?: (value: string) => Promise<AxiosResponse<SearchTagItem[] | SearchUserItem[]>>;
    icon?: JSX.Element;
    tags?: string[]; // Tags that could already be associated with the account
    type?: InputType;
}

/*
    Debounce search requests to minmize lag
    Minimize request amount per timeout
 */
const SEARCH_DEBOUNCE_TIMEOUT = 300;
const debounceSearchCb = debounce(async (
    value: string,
    onChange: (value: string) => Promise<AxiosResponse<SearchTagItem[] | SearchUserItem[]>>,
    setSearchResults: (result: SearchUserItem[] | SearchTagItem[]) => void,
) => {
    const { data } = await onChange(value);

    /**
     * If the API fails the result can be undefined
     * FIXME:
     * @var data shows as not possibly being undefined, but it can
     */
    if (data) {
        setSearchResults(data);
    }
}, SEARCH_DEBOUNCE_TIMEOUT, { trailing: true, leading: true});

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
        cancelTouchEnd: false,
    };
    /**
        Differentiates between single line inputs (e.g. hashtags, users)
        and multiline text areas for comments

        Also, required for cleaning the user input
     */
    private isSingleLine = this.props.type === InputType.SingleLine;
    private dropdownId = `${getUniqueId()}`; // String because compared to data-id which returns a string

    public componentWillUnmount() {
        this.removeDropdownCloseEvents();
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
            searchResults,
            isDropdownOpen,
            cancelTouchEnd,
        } = this.state;

        const inputComponent = this.isSingleLine
            ? <>
                <input
                    value={value}
                    onChange={this.onInput}
                    className={styles.input}
                    placeholder={placeholder}
                    onKeyUp={this.onEnterKey}
                    data-id={this.dropdownId}
                />
                <SearchDropdown
                    isLoading={loading}
                    dropDownId={this.dropdownId}
                    onSearchResultSelect={!cancelTouchEnd ? this.onSearchResultSelect : undefined}
                    searchResults={searchResults}
                    isDropdownOpen={isDropdownOpen}
                />
            </>
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
                <div className={styles.icon}>
                    {icon}
                </div>
            </div>
        );

        return (
            <div className={styles.container}>
                <div className={styles.inputWrapper}>
                    {iconComponent}
                    {inputComponent}
                    {loading && (
                        <div className={styles.spinnerContainer}>
                            <SpinnerSVG />
                        </div>
                    )}
                </div>
                <Divider theme={DividerTheme.Small} />
                <div className={styles.tagField}>
                    {tags.length
                        ? this.renderTags()
                        : <div className={styles.bodyPlaceholder}>{bodyPlaceholder}</div>
                    }
                </div>
            </div>
        );
    }
    private onInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        this.setState({ value });
        this.addDropdown(value);
    }
    private addDropdown = (value: string) => {
        if (this.props.onChange) {
            if (!value || value.length <= 2) {
                this.removeDropdownCloseEvents();
                this.setState({
                    isDropdownOpen: false,
                    searchResults: [],
                    loading: false,
                });
            } else {
                !this.state.isDropdownOpen && this.setState({
                    isDropdownOpen: true,
                });

                !this.state.loading && this.setLoading(true);

                // Add event listeners only when the dropdown should actually be shown
                this.addDropdownCloseEvents();

                debounceSearchCb(
                    value,
                    this.props.onChange,
                    this.setSearchResults,
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
    private onEnterKey = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const keyPressed = getPressedKey(event);
        /**
         * If more key presses have to be handled
         * then create universal keyHandler or use a lib
         */
        if (keyPressed && isEnterKey(keyPressed) && this.state.value) {
            this.onSubmit();
        }
    }
    private cleanTags = (value: string) => {
        // Clean raw tags input by user from unwanted characters
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
    private renderTags = () => {
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
    private onSearchResultSelect = (value: string) => {
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
        this.addDropdownCloseEvents();
        this.setState({
            isDropdownOpen: false,
        });
    }
    private dropdownCloseMouseEventCb = (event: InputClickTargetEvent) => {
        if (this.state.cancelTouchEnd) {
            this.setState({
                cancelTouchEnd: false,
            });
            return;
        }

        if(
            this.state.isDropdownOpen
            && this.dropdownId !== event.target.dataset.id
        ) {
            this.closeDropdown();
        }
    }
    private cancelDropdownClose = () => {
        /**
         * Required to not close the dropdown
         * on mobiles while touchmove is being fired
         */
        if (!this.state.cancelTouchEnd) {
            this.setState({
                cancelTouchEnd: true,
            });
        }
    }
    private addDropdownCloseEvents = () => {
        /*
            Event listener for managing closing dropdown
            when clicking outside the adjacent input field or the dropdown itself
        */
        if (this.isSingleLine) {
            window.addEventListener("click", this.dropdownCloseMouseEventCb);
            window.addEventListener("touchend", this.dropdownCloseMouseEventCb);
            window.addEventListener("touchmove", this.cancelDropdownClose);
        }
    }
    public removeDropdownCloseEvents = () => {
        window.removeEventListener("click", this.dropdownCloseMouseEventCb);
        window.removeEventListener("touchend", this.dropdownCloseMouseEventCb);
        window.removeEventListener("touchmove", this.cancelDropdownClose);
    }
}
