
const data = [
    {
        statsAt: "2018-09-31",
        mediaLiked: 1,
    },
    {
        statsAt: "2018-10-01",
        mediaLiked: 22,
    },
    {
        statsAt: "2018-10-02",
        mediaLiked: 33,
    },
    {
        statsAt: "2018-10-03",
        mediaLiked: 3,
    },
    {
        statsAt: "2018-10-04",
        mediaLiked: 14,
    },
    {
        statsAt: "2018-10-05",
        mediaLiked: 1,
    },
    {
        statsAt: "2018-10-06",
        mediaLiked: 6,
    },
    {
        statsAt: "2018-10-07",
        mediaLiked: 66,
    },
];

import * as React from "react";
import * as d3 from "d3";

export class Statistics extends React.PureComponent {
    private containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    public componentDidMount() {
        console.log(this.containerRef.current)

        const svgWidth = 600;
        const svgHeight = 400;
        const barWidth = (svgWidth - 50) / data.length;
        const barPadding = 5;
        const margin = { top: 20, right: 20, bottom: 30, left: 50 };
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;
        const graph = d3
            .select(this.containerRef.current)
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .style("border", "1px solid #e7e7e7");

        const parseDate = d3.timeParse("%Y-%m-%d");
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data.map(d => d.mediaLiked))])
            .range([height, 0]);

        const xScale = d3.scaleTime()
            .range([0, width]).nice();

        const y_axis = d3.axisLeft(yScale);
        const x_axis = d3.axisBottom(xScale);

        graph.append("g")
            .attr("transform", "translate(50, 0)")
            .call(y_axis);
        graph.append("g")
            .attr("transform", `translate(50, ${height})`)
            .call(x_axis);

        // const line = d3.line()
        //     .x((d) => x(d.statsAt))
        //     .y((d) => y(d.value));

        const barChart = graph
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .style("fill", "#61d07f")
            .attr("y", (d) => yScale(d.mediaLiked))
            .attr("height", d => yScale(0) - yScale(d.mediaLiked))
            .attr("width", () => {
                return barWidth - barPadding;
            })
            .attr("transform", (d, i) => {
                return `translate(${barWidth * i + margin.left}, 0)`;
            });

        graph.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.statsAt)
            .style("color", "black")
            .attr("y", (d) => height - d.mediaLiked  * 5)
            .attr("x", (d, i) => barWidth * i);

    }
    public render() {
        return (
            <div data-role="stats-container" ref={this.containerRef}>
                stats bro
            </div>
        );
    }
}
