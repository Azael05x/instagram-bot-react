import { SelectOption } from "../select/Select";
import { ChartType } from "./components/LineChart";

export const selectOptions: SelectOption<ChartType>[] = [
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
    l: 30,
    r: 20,
    t: 100
};

export const hoverLabel = {
    font: {
        ...fontFormat,
        color: "white",
    },
};
