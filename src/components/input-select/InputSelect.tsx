import * as React from "react";
import { AxiosResponse } from "axios";
import { throttle } from "lodash";

import { ENTER_KEY } from "../../consts";
import { Tag } from "./components/Tag";
import { cleanTags, cleanTextArea } from "../../utils/cleanTag";
import { Divider, DividerTheme } from "../divider/Divider";
import {
    SearchBody,
    SearchTagItem,
    SearchUserItem,
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
const searchThrottleTimeout = 1000;
const throttledSearchCb = throttle(async (
    value: string,
    onChange: (value: string) => Promise<AxiosResponse<SearchBody<SearchTagItem, SearchUserItem>>>,
    setSearchResults: (result: SearchUserItem[] | SearchTagItem[]) => void,
) => {
    const { data: { body: { result }} } = await onChange(value);
    result.length && setSearchResults(result);
}, searchThrottleTimeout, { trailing: false, leading: true});

export class InputSelect extends React.Component<InputSelectProps, InputSelectState> {
    public static defaultProps = {
        type: InputType.SingleLine,
    };
    public constructor(props: InputSelectProps) {
        super(props);

        this.state = {
            value: "",
            tags: props.tags || [],
            searchResults: [],
        };
    }
    private isSingleLine = this.props.type === InputType.SingleLine;
    public render() {
        const {
            placeholder,
            icon,
            bodyPlaceholder,
        } = this.props;
        const {
            value,
            tags,
        } = this.state;

        const inputComponent = this.isSingleLine
            ? (
                <input
                    value={value}
                    onChange={this.onInput}
                    className={styles.input}
                    placeholder={placeholder}
                    onKeyUp={this.onEnterKey}
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
        return (
            <div className={styles.container}>
                <div className={styles.inputWrapper}>
                    {icon && (
                        <div className={styles.iconContainer}>
                            {icon}
                        </div>
                    )}
                    {inputComponent}
                    {value && this.renderDropdown()}
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
            throttledSearchCb(value, this.props.onChange, this.setSearchResults);
        }
    }
    private setSearchResults = (result: SearchUserItem[] | SearchTagItem[]) => {
        if (isUserSearch(result)) {
            this.setState({
                searchResults: checkDuplicateUsersResult(
                    this.state.tags,
                    sortUserSearchResult(result).slice(0, 10),
                ),
            });
        } else {
            this.setState({
                searchResults: checkDuplicateTagResult(
                    this.state.tags,
                    sortTagSearchResult(result).slice(0, 10),
                ),
            });
        }
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
        if (isUserSearch(this.state.searchResults)) {
            return (
                <div className={styles.searchDropdown}>
                    {this.state.searchResults.map((result, i) => (
                        <SearchEntry
                            key={i}
                            name={result.username}
                            mediaCount={result.followerCount}
                            onClick={this.onSearchClick}
                        />
                    ))}
                </div>
            );
        } else {
            return (
                <div className={styles.searchDropdown}>
                    {this.state.searchResults.map((result, i) => (
                        <SearchEntry
                            key={i}
                            name={result.name}
                            mediaCount={result.mediaCount}
                            onClick={this.onSearchClick}
                        />
                    ))}
                </div>
            );
        }

    }
    private onSearchClick = (value: string) => {
        /*
            No cleaning  or additional checking required.
            Cleaning already done before displaying search results
        */
        this.setNewTags([...this.state.tags, value]);
    }
}
