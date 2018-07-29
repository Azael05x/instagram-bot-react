import * as React from "react";

import { Select, SelectOption, SelectTheme } from "../../../select/Select";
import { FollowTimeType } from "@middleware/types";

export enum FollowTimeDataRoleType {
    Slow = "speed_slow",
    Medium = "speed_medium",
    Fast = "speed_fast",
}

const activityTimeDataRole = {
    [FollowTimeDataRoleType.Slow]: 1440,
    [FollowTimeDataRoleType.Medium]: 2880,
    [FollowTimeDataRoleType.Fast]: 4320,
};
const activityTimeToDataRole = {
    1440: FollowTimeDataRoleType.Slow,
    2880: FollowTimeDataRoleType.Medium,
    4320: FollowTimeDataRoleType.Fast,
};
const timeOptions: SelectOption[] = [
    {
        dataRole: FollowTimeDataRoleType.Slow,
        label: "1 Day",
    },
    {
        dataRole: FollowTimeDataRoleType.Medium,
        label: "2 Days",
    },
    {
        dataRole: FollowTimeDataRoleType.Fast,
        label: "3 Days",
    },
];

export interface ActivitySpeedProps {
    time: FollowTimeType;
    onChange: (value: FollowTimeType) => void;
}

export class FollowTime extends React.PureComponent<ActivitySpeedProps> {
    public render() {
        const DataRole = activityTimeToDataRole[this.props.time];
        const currentOption = {...timeOptions.filter(t => t.dataRole === DataRole)[0]};

        return (
            <>
                <div style={{marginBottom: ".5rem"}}>Follow Time</div>
                <Select
                    currentOption={currentOption}
                    onSelectOption={this.onSelectTime}
                    selectOptions={timeOptions}
                    theme={SelectTheme.Small}
                />
            </>
        );
    }
    private onSelectTime = (event: React.MouseEvent<HTMLDivElement>) => {
        const speed = event.currentTarget.getAttribute("data-role") as FollowTimeDataRoleType;
        this.props.onChange(activityTimeDataRole[speed]);
    }
}
