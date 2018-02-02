import * as React from "react";
import { ENTER_KEY } from "../../consts";
import { Tag } from "./components/Tag";

import * as styles from "./InputSelect.css";
import { cleanTag } from "../../utils/cleanTag";

export interface InputSelectState {
    tag: string;
    tags: string[];
}
export interface InputSelectProps {
    placeholder: string;
    bodyPlaceholder: string;
    icon?: JSX.Element;
}

export class InputSelect extends React.PureComponent<InputSelectProps, InputSelectState> {
    public constructor(props: InputSelectProps) {
        super(props);

        this.state = {
            tag: "",
            tags: [],
        };
    }
    public render() {
        return (
            <div className={styles.container}>
                <div className={styles.inputWrapper}>
                    {this.props.icon && (
                        <div className={styles.iconContainer}>
                            {this.props.icon}
                        </div>
                    )}
                    <input
                        value={this.state.tag}
                        onChange={this.onInput}
                        className={styles.input}
                        placeholder={this.props.placeholder}
                        onKeyUp={this.onEnterKey}
                    />
                </div>
                <div className={styles.tagField}>
                    {this.state.tags.length
                        ? this.rendertags()
                        : <div className={styles.bodyPlaceholder}>{this.props.bodyPlaceholder}</div>
                    }
                </div>
            </div>
        );
    }
    private onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            tag: event.currentTarget.value,
        });
    }
    private onEnterKey = (key: React.KeyboardEvent<HTMLInputElement>) => {
        if (key.keyCode === ENTER_KEY && this.state.tag) {
            this.onSubmit();
        }
    }
    private onSubmit = () => {
        const { tag, tags } = this.state;
        const newTag = cleanTag(tag);

        if (!tags.includes(newTag)) {
            this.setState({
                tag: "",
                tags: [...tags, newTag],
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
            })
        }
    }
    private rendertags = () => {
        return this.state.tags
            .map((tag: string, i: number) => <Tag key={i} value={tag} onRemove={this.onRemoveTag(i)} />);
    }
}
