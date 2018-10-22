// import * as React from "react";
// import * as d3 from "d3";
// import { getStatistics } from "@utils/requests";
// import { DailyStats } from "@types";

// import * as styles from "./Statistics.scss";

// export type ChartType = keyof Pick<DailyStats, "mediaLiked" | "userFollowers">;

// export interface StatisticsState {
//     svgWidth: number;
//     svgHeight: number;
//     // Dimensions without margin
//     width: number;
//     height: number;
//     data: DailyStats[];
//     chartType: ChartType;
// }
// const BREAK_POINT_RADIUS = 5;
// const CHART_MARGIN = 40;

// export class Statistics extends React.PureComponent<{}, StatisticsState> {
//     private containerRef: React.RefObject<SVGSVGElement> = React.createRef();
//     private overlayRef: React.RefObject<SVGRectElement> = React.createRef();
//     private wrapper: React.RefObject<HTMLDivElement> = React.createRef();
//     private lineGenerator =  d3.line<DailyStats>()
//         .x((d) => this.xScale(d.statsAt))
//         .y((d) => this.yScale(d[this.state.chartType]));

//     private yScale = d3.scaleLinear();
//     private xScale = d3.scaleTime();
//     private graph: d3.Selection<d3.BaseType, {}, null, undefined>;
//     private focus: d3.Selection<d3.BaseType, {}, null, undefined>;
//     private rect: d3.Selection<d3.BaseType, {}, null, undefined>;
//     private bisectDate = d3.bisector((d: DailyStats) => new Date(d.statsAt)).left;
//     private timeParseFormat = d3.timeParse("%Y-%m-%d");

//     public state: StatisticsState = {
//         svgWidth: 800,
//         svgHeight: 400,
//         width: 800 - CHART_MARGIN * 2,
//         height: 400 - CHART_MARGIN * 2,
//         data: [],
//         chartType: "mediaLiked",
//     };

//     public async componentDidMount() {

//         const { width } = this.wrapper.current.getBoundingClientRect();

//         this.setState({
//             svgWidth: width,
//             width: width - CHART_MARGIN * 2,
//             data: (await getStatistics(32)).data.map(d => {
//                 const {
//                     statsAt,
//                     ...rest
//                 } = d;

//                 return {
//                     ...rest,
//                     statsAt: this.timeParseFormat(statsAt),
//                 };
//             })
//         });

//         // window.addEventListener("resize", this.onResize);
//     }

//     public componentDidUpdate() {
//         if (this.state.data.length) {
//             this.renderChart(this.state.data);
//         }
//     }

//     // public componentWillUnmount() {
//     //     window.removeEventListener("resize", this.onResize);
//     // }

//     private onClick = () => {
//         this.setState({
//             chartType: "userFollowers",
//         });
//     }
//     public render() {
//         return (
//             <div className={styles.container} data-role="stats-container" ref={this.wrapper}>
//                 <button onClick={this.onClick}>Change</button>
//                 <svg
//                     preserveAspectRatio={"xMinYMin meet"}
//                     width={this.state.svgWidth}
//                     height={this.state.svgHeight}
//                     className={styles.svg}
//                     ref={this.containerRef}
//                 >
//                 </svg>
//                 <svg
//                     preserveAspectRatio={"xMinYMin meet"}
//                     className={styles.overlayContainer}
//                     width={this.state.width}
//                     height={this.state.height}
//                     transform={"translate(" + CHART_MARGIN + "," + CHART_MARGIN + ")"}
//                 >
//                     <rect
//                         className={styles.overlay}
//                         width={this.state.width - CHART_MARGIN}
//                         height={this.state.height - CHART_MARGIN}
//                         ref={this.overlayRef}
//                     />
//                 </svg>
//             </div>
//         );
//     }

//     // private onResize = () => {
//     //     const { width } = this.wrapper.current.getBoundingClientRect();

//     //     this.setState({
//     //         svgWidth: width,
//     //         width: width - CHART_MARGIN * 2,
//     //     }, () => {
//     //         this.renderChart();
//     //     });
//     // }

//     private renderChart = (data: DailyStats[] = this.state.data) => {
//         this.graph = d3.select(this.containerRef.current);

//         this.yScale
//             .domain(d3.extent(data, (d) => d[this.state.chartType]))
//             .range([this.state.height, CHART_MARGIN]);

//         this.xScale
//             .domain(d3.extent(data, (d) => d.statsAt))
//             .range([CHART_MARGIN, this.state.width]);

//         this.graph.append("path")
//             .datum(data)
//             .attr("class", styles.line)
//             .attr("d", this.lineGenerator);

//         this.rect = d3
//             .select(this.overlayRef.current)
//             .on("mouseover", this.onMouseOver)
//             .on("mouseleave", this.onMouseLeave)
//             .on("mousemove", this.onMouseMove);

//         this.addAxis();
//         this.addBreakPoints();
//         this.addBreakPointHighlight();
//     }
//     private addAxis = () => {
//         const y_axis = d3.axisLeft(this.yScale);
//         const x_axis = d3.axisBottom(this.xScale).ticks(this.state.data.length, this.timeParseFormat);

//         // AXIS Y
//         this.graph.append("g")
//             .attr("transform", `translate(${CHART_MARGIN}, 0)`)
//             .call(y_axis);
//         // AXIS X
//         this.graph.append("g")
//             .attr("transform", `translate(0, ${this.state.height})`)
//             .call(x_axis)
//             .selectAll("text")
//             .attr("y", 0)
//             .attr("x", 9)
//             .attr("dy", ".35em")
//             .attr("transform", "rotate(90)")
//             .style("text-anchor", "start");
//     }
//     private addBreakPoints = () => {
//         this.graph.selectAll("circle")
//             .data(this.state.data)
//             .enter()
//             .append("circle")
//             .attr("class", styles.breakPoint)
//             .attr("cx", (d) => this.xScale(d.statsAt))
//             .attr("cy", (d) => this.yScale(d[this.state.chartType]))
//             .attr("r", BREAK_POINT_RADIUS);
//     }
//     private addBreakPointHighlight = () => {
//         this.focus = this.graph
//             .append("g")
//             .style("display", "none")
//             .attr("class", "focus");

//         this.focus
//             .append("circle")
//             .attr("class", styles.focusCircle);

//         this.focus.append("text")
//             .attr("x", BREAK_POINT_RADIUS * 2)
//             .attr("dy", "0.35em");
//     }
//     private onMouseOver = () => {
//         this.focus.style("display", null);
//     }
//     private onMouseLeave = () => {
//         this.focus.style("display", "none");
//     }
//     private onMouseMove = () => {
//         const x = d3.mouse(this.overlayRef.current)[0];

//         const domainValueForX = this.xScale.invert(x);
//         const i = this.bisectDate(this.state.data, domainValueForX, 0);
//         const d0 = this.state.data[i - 1];
//         const d1 = this.state.data[i];

//         const d = d0
//             ? (x - this.xScale(d0.statsAt) > this.xScale(d1.statsAt) - x ? d1 : d0)
//             : d1;

//         this.focus
//             .attr("transform", `translate(${this.xScale(d.statsAt)}, ${this.yScale(d[this.state.chartType])})`)
//             .select("text").text(() => d[this.state.chartType]);
//     }
// }
