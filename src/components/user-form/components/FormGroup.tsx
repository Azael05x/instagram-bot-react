// tslint:disable:max-line-length

import * as React from "react";
import * as styles from "../UserForm.scss";
import * as classNames from "classnames";

export interface FormGroupProps {
    htmlFor: string;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    autoFocus?: boolean;
}

export class FormGroup extends React.PureComponent<FormGroupProps> {
    public static defaultProps = {
        type: "text",
        autoFocus: false,
    };

    public render() {
        const {
            htmlFor,
            label,
            value,
            onChange,
            onKeyUp,
            type,
            autoFocus,
        } = this.props;

        return (
            <div className={styles.formGroup}>
                <label
                    htmlFor={htmlFor}
                    className={classNames(styles.label, { [styles.hidden]: value })}
                >
                    {label}
                </label>
                <input
                    id={htmlFor}
                    className={styles.input}
                    type={type}
                    required
                    onChange={onChange}
                    value={value}
                    autoComplete="nope"
                    autoCapitalize="nope"
                    autoCorrect="nope"
                    onKeyUp={onKeyUp}
                    autoFocus={autoFocus}
                />
            </div>
        );
    }
}
