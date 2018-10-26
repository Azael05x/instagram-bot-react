import * as React from "react";

import { CaretIcon } from "../icons/Caret";
import { Option } from "./components/Option";
import { isMobile } from "@utils/deviceSupport";
import { noop } from "@utils/functions";

import * as styles from "./Select.scss";

export interface SelectState {
    currentOption: string;
    isOpen: boolean;
}

export enum SelectTheme {
    Regular = "regular",
    Small = "small",
}
export interface SelectOption<T = string> {
    dataRole: T;
    label: string;
}
export interface SelectProps {
    selectOptions: SelectOption[];
    currentOption?: SelectOption;
    onSelectOption: (event: React.MouseEvent<HTMLDivElement>) => void;
    theme?: SelectTheme;
}

/**
    Custom Select component.

    Options defined within caller component as SelectOption[]
 */
export class Select extends React.PureComponent<SelectProps, SelectState> {
    public static defaultProps = {
        theme: SelectTheme.Regular,
        currentOption: {},
    };
    public state = {
        currentOption: this.props.currentOption.label || this.props.selectOptions[0].label,
        isOpen: false,
    };
    private isMobile = isMobile();
    public render() {
        return (
            <div
                onClick={this.onClick}
                onMouseOver={!this.isMobile ? this.openOptionsList : noop}
                onMouseOut={!this.isMobile ? this.closeOptionsList : noop}
                className={`${styles.navigation} ${styles[this.props.theme]}`}
            >
               {this.state.currentOption}
                <span className={`${styles.caret} ${ this.state.isOpen && styles.active }`}>
                    <CaretIcon />
                </span>
                <div className={`${styles.navigationOptionsContainer} ${ this.state.isOpen && styles.active }`}>
                    {this.renderOptions()}
                </div>
            </div>
        );
    }
    private onSelectOption = (event: React.MouseEvent<HTMLDivElement>) => {
        this.setState({ currentOption: event.currentTarget.innerText });
        this.props.onSelectOption(event);
    }
    private onClick = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    private openOptionsList = () => {
        if (!this.state.isOpen) {
            this.setState({
                isOpen: true,
            });
        }
    }
    private closeOptionsList = () => {
        if (this.state.isOpen) {
            this.setState({
                isOpen: false,
            });
        }
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
