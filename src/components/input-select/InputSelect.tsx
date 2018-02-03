import * as React from "react";
import { ENTER_KEY } from "../../consts";
import { Tag } from "./components/Tag";

import * as styles from "./InputSelect.css";
import { cleanTag } from "../../utils/cleanTag";
import { Divider, DividerTheme } from "../divider/Divider";

export enum InputType {
    TextField,
    SingleLine,
}
export interface InputSelectState {
    tag: string;
    tags: string[];
}
export interface InputSelectProps {
    placeholder: string;
    bodyPlaceholder: string;
    onChange: (value: string[]) => void;
    icon?: JSX.Element;
    tags?: string[]; // Tags that could already be associated with the account
    type?: InputType;
}

export class InputSelect extends React.Component<InputSelectProps, InputSelectState> {
    public static defaultProps = {
        type: InputType.SingleLine,
    }
    public constructor(props: InputSelectProps) {
        super(props);

        this.state = {
            tag: "",
            tags: props.tags || [],
        };
    }
    private isSingleLine = this.props.type === InputType.SingleLine;
    public render() {
        const inputComponent = this.isSingleLine
            ? (
                <input
                    value={this.state.tag}
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
                    value={this.state.tag}
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
        this.setState({
            tag: event.currentTarget.value,
        });
    }
    private onEnterKey = (key: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (key.keyCode === ENTER_KEY && this.state.tag) {
            this.onSubmit();
        }
    }
    private onSubmit = () => {
        const { tag, tags } = this.state;
        const newTag = this.isSingleLine ? cleanTag(tag) : tag;

        if (!tags.includes(newTag)) {
            const newTags = [...tags, newTag];

            this.setState({
                tag: "",
                tags: newTags,
            }, () => {
                this.props.onChange(newTags);
            });
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
                this.props.onChange(newTags);
            })
        }
    }
    private rendertags = () => {
        return this.state.tags
            .map((tag: string, i: number) => <Tag key={i} value={tag} onRemove={this.onRemoveTag(i)} />);
    }
}
