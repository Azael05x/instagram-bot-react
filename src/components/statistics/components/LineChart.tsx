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
    PlotComponent: React.ComponentClass<any>;
}
export interface LineChartProps {
    accountId: number;
}

export class LineChart extends React.PureComponent<LineChartProps, LineChartState> {
    public state: LineChartState = {
        plotData: [],
        chartType: "mediaLiked",
        PlotComponent: null,
    };
    private data: DailyStatsRaw[];

    public async componentDidMount() {
        this.data = (await getStatistics(this.props.accountId)).data;

        this.setState({
            plotData: this.getPlotData(this.state.chartType),
            PlotComponent: getPlotly(),
        });
    }

    public render() {
        const Plot = this.state.PlotComponent;

        if (!Plot) {
            return null;
        }

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
                <Plot
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
                        dragmode: "turntable",
                        xaxis: { ...axisLayout },
                        yaxis: { ...axisLayout },
                        margin: chartMargins,
                        hoverlabel: hoverLabel,
                    }}
                />
            </div>
        );
    }

    private setChartType = (event: React.MouseEvent<HTMLElement>) => {
        const chosenData = event.currentTarget.getAttribute("data-role") as ChartType;
        if (this.state.chartType !== chosenData) {
            this.setState({
                plotData: this.getPlotData(chosenData),
                chartType: chosenData,
            });
        }
    }

    private getPlotData = (chartType: ChartType): Partial<PlotData>[] => {
        return [
            {
                x: this.data.map(d => d.statsAt),
                y: this.data.map(d => d[chartType]),
                mode: "lines+markers",
            },
        ];
    }
}

export default LineChart;
