import * as React from "react";
import { getStatistics } from "@utils/requests";

import Plot from "react-plotly.js";
import { PlotData } from "plotly.js";

import * as styles from "../Statistics.scss";

export interface LineChartState { plotData: Partial<PlotData>[]; }

export class LineChart extends React.PureComponent<{}, LineChartState> {
    public state: LineChartState = {
        plotData: [],
    };

    public async componentDidMount() {
        const data = (await getStatistics(32)).data;

        const plotData: Partial<PlotData>[] = [
            {
                x: data.map(d => d.statsAt),
                y: data.map(d => d.mediaLiked),
                mode: "lines",
            },
        ];

        this.setState({
            plotData,
        });
    }

    public render() {
        return (
            <div className={styles.chart}>
                <Plot
                    style={{ width: "100%", height: "100%", }}
                    data={this.state.plotData}
                    useResizeHandler={true}
                    config={{
                        displayModeBar: false,
                        displaylogo: false,
                    }}
                    layout={{
                        title: "Media Likes per day",
                        autosize: true,
                        showlegend: false,
                        dragmode: "turntable",
                        xaxis: {
                            showline: true,
                            showgrid: false,
                            showticklabels: true,
                            linecolor: "rgb(204,204,204)",
                            linewidth: 2,
                            ticks: "outside",
                            tickcolor: "rgb(204,204,204)",
                            tickwidth: 2,
                            ticklen: 5,
                            tickfont: {
                                family: "Arial",
                                size: 12,
                                color: "rgb(82, 82, 82)"
                            }
                        },
                        yaxis: {
                            showgrid: false,
                            showline: true,
                            showticklabels: true,
                            linecolor: "rgb(204,204,204)",
                            linewidth: 2,
                            ticks: "outside",
                            tickcolor: "rgb(204,204,204)",
                            tickwidth: 2,
                            ticklen: 5,
                            tickfont: {
                                family: "Arial",
                                size: 12,
                                color: "rgb(82, 82, 82)"
                            }
                        },
                        margin: {
                            l: 100,
                            r: 20,
                            t: 100
                        },
                    }}
                />
            </div>
        );
    }
}

export default LineChart;
