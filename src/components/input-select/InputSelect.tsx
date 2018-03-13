import * as React from "react";
import { ENTER_KEY } from "../../consts";
import { Tag } from "./components/Tag";

import * as styles from "./InputSelect.css";
import { cleanTags, cleanTextArea } from "../../utils/cleanTag";
import { Divider, DividerTheme } from "../divider/Divider";

export enum InputType {
    TextField,
    SingleLine,
}
export interface InputSelectState {
    value: string;
    tags: string[];
}
export interface InputSelectProps {
    placeholder: string;
    bodyPlaceholder: string;
    onSubmit: (value: string[]) => void;
    onChange?: (value: string) => void;
    icon?: JSX.Element;
    tags?: string[]; // Tags that could already be associated with the account
    type?: InputType;
}

export class InputSelect extends React.Component<InputSelectProps, InputSelectState> {
    public static defaultProps = {
        type: InputType.SingleLine,
    };
    public constructor(props: InputSelectProps) {
        super(props);

        this.state = {
            value: "",
            tags: props.tags || [],
        };
    }
    private isSingleLine = this.props.type === InputType.SingleLine;
    public render() {
        const inputComponent = this.isSingleLine
            ? (
                <input
                    value={this.state.value}
                    onChange={this.onInput}
                    className={styles.input}
                    placeholder={this.props.placeholder}
                    onKeyUp={this.onEnterKey}
                />
            )
            : (
                <textarea
                    cols={40}
                    rows={5}
                    value={this.state.value}
                    onChange={this.onInput}
                    className={styles.input}
                    placeholder={this.props.placeholder}
                    onKeyUp={this.onEnterKey}
                />
            );
        return (
            <div className={styles.container}>
                <div className={styles.inputWrapper}>
                    {this.props.icon && (
                        <div className={styles.iconContainer}>
                            {this.props.icon}
                        </div>
                    )}
                    {inputComponent}
                </div>
                <Divider theme={DividerTheme.Small} />
                <div className={styles.tagField}>
                    {this.state.tags.length
                        ? this.rendertags()
                        : <div className={styles.bodyPlaceholder}>{this.props.bodyPlaceholder}</div>
                    }
                </div>
            </div>
        );
    }
    private onInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;

        if (this.props.onChange) {
            this.props.onChange(value);
        }
        this.setState({ value });
    }
    private onEnterKey = (key: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (key.keyCode === ENTER_KEY && this.state.value) {
            this.onSubmit();
        }
    }
    private onSubmit = () => {
        const { value, tags } = this.state;
        const cleanValue = this.isSingleLine ? cleanTags(value) : cleanTextArea(value);

        if (typeof cleanValue === "string") {
            if (cleanValue) {
                if (!tags.includes(cleanValue)) {
                    this.setNewTags([...tags, cleanValue]);
                }
            }
        } else {
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
}
