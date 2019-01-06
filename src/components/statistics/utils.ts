import { SelectOption } from "../select/Select";
import { ChartType } from "./components/LineChart";
import { StatisticsPeriod } from "./types";
import { Label, PlotData } from "plotly.js";

export const selectChartPeriodOptions: SelectOption<StatisticsPeriod>[] = [
    {
        dataRole: StatisticsPeriod.All,
        label: "All",
    },
    {
        dataRole: StatisticsPeriod.Year,
        label: "Year",
    },
    {
        dataRole: StatisticsPeriod.Month,
        label: "Month",
    },
    {
        dataRole: StatisticsPeriod.Week,
        label: "Week",
    },
];
export const selectChartTypeOptions: SelectOption<ChartType>[] = [
    {
        dataRole: "mediaLiked",
        label: "Media Liked",
    },
    {
        dataRole: "userFollowers",
        label: "Followers",
    },
    {
        dataRole: "mediaCommented",
        label: "Media Commented",
    },
    {
        dataRole: "usersFollowed",
        label: "Users followed",
    },
];

const fontFormat = {
    family: "Montserrat",
    size: 12,
    color: "#395173", // $darkColor
};

export const tickFormat = {
    tickcolor: "#e8e9ec", // $lightColor
    tickwidth: 2,
    ticklen: 5,
    ticks: "outside",
    tickfont: fontFormat,
};

export const axisLayout = {
    showgrid: false,
    showline: true,
    showticklabels: true,
    linecolor: "#e8e9ec", // $lightColor
    linewidth: 2,
    fixedrange: true,
    ...tickFormat,
};

export const chartMargins = {
    l: 50,
    r: 20,
    t: 50
};

export const hoverLabel: Partial<Label> = {
    font: {
        ...fontFormat,
        color: "white",
    },
    bgcolor: "#42beb6", // $mainColor
    bordercolor: "#395173" // $darkColor
};

export const markerAndLineConfig: Partial<PlotData> = {
    marker: {
        size: 7,
        color: "#fff",
        line: {
            width: 2
        }
    },
    line: {
        color: "#42beb6", // $mainColor
    },
};
