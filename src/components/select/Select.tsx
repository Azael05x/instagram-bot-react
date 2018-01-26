import * as React from "react";
import { CaretIcon } from "../icons/Caret";
import { Option } from "./components/Option";

import * as styles from "./Select.css";

export interface SelectState {
    currentOption: string;
}

export interface SelectOption {
    dataRole: string;
    label: string;
}
export interface SelectProps {
    selectOptions: SelectOption[];
    onSelectOption: (event: React.MouseEvent<HTMLDivElement>) => void;
}

/**
    Custom Select component.

    Options defined within caller component as SelectOption[]
 */
export class Select extends React.PureComponent<SelectProps, SelectState> {
    public constructor(props: SelectProps) {
        super(props);

        this.state = {
            currentOption: props.selectOptions[0].label,
        }
    }
    public render() {
        return (
            <div className={styles.navigation}>
               {this.state.currentOption}
                <span className={styles.caret}>
                    <CaretIcon />
                </span>
                <div className={styles.navigationOptionsContainer}>
                    {this.renderOptions()}
                </div>
            </div>
        );
    }
    private onSelectOption = (event: React.MouseEvent<HTMLDivElement>) => {
        this.setState({ currentOption: event.currentTarget.innerText })
        this.props.onSelectOption(event);
    }
    private renderOptions = () => {
        return this.props.selectOptions.map((selectOption: SelectOption, i: number) => {
            return (
                <Option
                    onClick={this.onSelectOption}
                    dataRole={selectOption.dataRole}
                    label={selectOption.label}
                    key={i}
                />
            );
        });
    }
}
