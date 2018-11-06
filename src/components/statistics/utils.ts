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
];

const fontFormat = {
    family: "Montserrat",
    size: 12,
    color: "#395173"
};

export const tickFormat = {
    tickcolor: "#e8e9ec",
    tickwidth: 2,
    ticklen: 5,
    ticks: "outside",
    tickfont: fontFormat,
};

export const axisLayout = {
    showgrid: false,
    showline: true,
    showticklabels: true,
    linecolor: "#e8e9ec",
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
    bgcolor: "#42beb6"
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
        color: "#42beb6",
    },
};
