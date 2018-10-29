import * as React from "react";
import { PlotData } from "plotly.js";
import { getStatistics } from "@utils/requests";
import { DailyStats, DailyStatsRaw } from "@types";

import { Select, SelectOption, SelectTheme } from "../../select/Select";
import {
    axisLayout,
    chartMargins,
    hoverLabel,
    selectChartPeriodOptions,
    selectChartTypeOptions,
} from "../utils";
import { StatisticsPeriod } from "../types";

const getPlotly = () => {
    /**
     * TODO: Add proper typings
     */
    const createPlotlyComponent =
        (require("react-plotly.js/factory")) as (arg: any) => React.ComponentClass<any>;
    return createPlotlyComponent(require("plotly.js-basic-dist"));
};

import * as styles from "../Statistics.scss";

export type ChartType = keyof Pick<DailyStats, "mediaLiked" | "userFollowers">;
export interface LineChartState {
    plotData: Partial<PlotData>[];
    chartType: ChartType;
    chartPeriod: StatisticsPeriod;
}
export interface LineChartProps {
    accountId: number;
}

export class LineChart extends React.PureComponent<LineChartProps, LineChartState> {
    public state: LineChartState = {
        plotData: [],
        chartType: "mediaLiked",
        chartPeriod: StatisticsPeriod.Month,
    };
    private PlotComponent: React.ComponentClass<any> = getPlotly();
    private data: DailyStatsRaw[];

    public async componentDidMount() {
        this.data = (await getStatistics(this.props.accountId)).data;

        this.setState({
            plotData: [
                {
                    x: this.data.map(d => d.statsAt),
                    mode: "lines+markers",
                    y: this.data.map(d => d[this.state.chartType]),
                },
            ],
        });
    }

    public render() {
        let currentChartTypeOption: SelectOption<ChartType>;
        for (const option of selectChartTypeOptions) {
            if (this.state.chartType === option.dataRole) {
                currentChartTypeOption = option;
            }
        }

        let currentChartPeriodOption: SelectOption<StatisticsPeriod>;
        for (const option of selectChartPeriodOptions) {
            if (this.state.chartPeriod === option.dataRole) {
                currentChartPeriodOption = option;
            }
        }

        return (
            <div className={styles.container}>
                <div className={styles.settings}>
                    <Select
                        onSelectOption={this.setChartType}
                        selectOptions={selectChartTypeOptions}
                        currentOption={currentChartTypeOption}
                        theme={SelectTheme.Small}
                    />
                    <Select
                        onSelectOption={this.setChartPeriod}
                        selectOptions={selectChartPeriodOptions}
                        currentOption={currentChartPeriodOption}
                        theme={SelectTheme.Small}
                    />
                </div>

                <this.PlotComponent
                    className={styles.chart}
                    data={this.state.plotData}
                    useResizeHandler={true}
                    config={{
                        displayModeBar: false,
                        displaylogo: false,
                    }}
                    layout={{
                        autosize: true,
                        showlegend: false,
                        xaxis: { ...axisLayout },
                        yaxis: { ...axisLayout },
                        margin: chartMargins,
                        hoverlabel: hoverLabel,
                        hoverdistance: -1,
                    }}
                />
            </div>
        );
    }

    private setChartType = (event: React.MouseEvent<HTMLElement>) => {
        const chosenData = event.currentTarget.getAttribute("data-role") as ChartType;
        if (this.state.chartType !== chosenData) {
            this.setState({
                plotData: [{
                    ...this.state.plotData[0],
                    y: this.data.map(d => d[chosenData]),
                }],
                chartType: chosenData,
            });
        }
    }

    private setChartPeriod = async (event: React.MouseEvent<HTMLElement>) => {
        const chosenData = event.currentTarget.getAttribute("data-role") as StatisticsPeriod;

        if (this.state.chartPeriod !== chosenData) {
            this.data = (await getStatistics(this.props.accountId, chosenData)).data;

            this.setState({
                plotData: [
                    {
                        x: this.data.map(d => d.statsAt),
                        mode: "lines+markers",
                        y: this.data.map(d => d[this.state.chartType]),
                    },
                ],
                chartPeriod: chosenData,
            });
        }
    }
}

export default LineChart;
