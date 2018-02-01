import * as React from "react";
import { Select, SelectOption, SelectTheme } from "../../../select/Select";
import { ActivitySpeedType } from "../../../../middleware/types";


export enum ActivitySpeedDataRoleType {
    Slow = "speed_slow",
    Medium = "speed_medium",
    Fast = "speed_fast",
}
const activitySpeedDataRole = {
    [ActivitySpeedDataRoleType.Slow]: 1,
    [ActivitySpeedDataRoleType.Medium]: 2,
    [ActivitySpeedDataRoleType.Fast]: 3,
}
const speedOptions: SelectOption[] = [
    {
        dataRole: ActivitySpeedDataRoleType.Slow,
        label: "Slow",
    },
    {
        dataRole: ActivitySpeedDataRoleType.Medium,
        label: "Medium",
    },
    {
        dataRole: ActivitySpeedDataRoleType.Fast,
        label: "Fast",
    },
]

export interface ActivitySpeedProps {
    speed: ActivitySpeedType;
    onChange: (value: ActivitySpeedType) => void;
}

export class ActivitySpeed extends React.PureComponent<ActivitySpeedProps> {
    public render() {
        return (
            <>
                <div style={{marginBottom: ".5rem"}}>Activity Speed</div>
                <Select
                    currentOption={speedOptions[this.props.speed-1]}
                    onSelectOption={this.onSelectSpeed}
                    selectOptions={speedOptions}
                    theme={SelectTheme.Small}
                />
            </>
        );
    }
    private onSelectSpeed = (event: React.MouseEvent<HTMLDivElement>) => {
        const speed = event.currentTarget.getAttribute("data-role") as ActivitySpeedDataRoleType;
        this.props.onChange(activitySpeedDataRole[speed]);
    }
}
