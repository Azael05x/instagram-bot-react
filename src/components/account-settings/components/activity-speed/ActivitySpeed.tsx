import * as React from "react";
import { Select, SelectOption, SelectTheme } from "../../../select/Select";

export class ActivitySpeed extends React.PureComponent {
    public render() {
        const speedOptions: SelectOption[] = [
            {
                dataRole: "speed_slow",
                label: "Slow",
            },
            {
                dataRole: "speed_medium",
                label: "Medium",
            },
            {
                dataRole: "speed_fast",
                label: "Fast",
            },
        ];

        return (
            <>
                <div style={{marginBottom: ".5rem"}}>Activity Speed</div>
                <Select
                    onSelectOption={this.onSelectSpeed}
                    selectOptions={speedOptions}
                    theme={SelectTheme.Small}
                />
            </>
        );
    }
    private onSelectSpeed = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log('event', event.currentTarget.getAttribute("data-role"))
    }
}
