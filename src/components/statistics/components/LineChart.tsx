import * as React from "react";
import { getStatistics } from "@utils/requests";
import { PlotData } from "plotly.js";
import { DailyStats, DailyStatsRaw } from "@types";
import { Select, SelectOption, SelectTheme } from "src/components/select/Select";
import { selectOptions, axisLayout, chartMargins, hoverLabel } from "../utils";

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
}
export interface LineChartProps {
    accountId: number;
}

export class LineChart extends React.PureComponent<LineChartProps, LineChartState> {
    public state: LineChartState = {
        plotData: [],
        chartType: "mediaLiked",
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
        let currentOption: SelectOption<ChartType>;
        for (const option of selectOptions) {
            if (this.state.chartType === option.dataRole) {
                currentOption = option;
            }
        }

        return (
            <div className={styles.container}>
                <Select
                    onSelectOption={this.setChartType}
                    selectOptions={selectOptions}
                    currentOption={currentOption}
                    theme={SelectTheme.Small}
                />
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
}

export default LineChart;
