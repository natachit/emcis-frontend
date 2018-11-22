import React, { Component } from "react"
import json from "./data/mail3.json"
import ReactEcharts from "echarts-for-react";

class MailGraph extends Component {

    getOption() {
        return {
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    type: 'graph',
                    layout: 'none',
                    data: json.nodes.map(function (node) {
                        return {
                            x: node.x,
                            y: node.y,
                            id: node.id,
                            name: node.label,
                            symbolSize: node.size*3,
                            itemStyle: {
                                normal: {
                                    color: node.color,
                                    borderColor: '#fff',
                                    borderWidth: 1,
                                    shadowBlur: 2,
                                    shadowColor: '#f0f3f5'
                                },
                            },
                            label: {
                                position: 'right',
                                formatter: '{b}',
                                color: 'white'
                            },
                        };
                    }),
                    edges: json.edges.map(function (edge) {
                        return {
                            source: edge.From,
                            target: edge.To,
                            id: edge.id,
                        };
                    }),
                    label: {
                        normal: {
                            position: ['50%','100%'],
                            show: true,
                        },
                        emphasis: {
                            show: true,
                        }
                    },
                    roam: true,
                    focusNodeAdjacency: true,
                    lineStyle: {
                        normal: {
                            width: 1,
                            curveness: 0.3,
                            opacity: 1
                        },
                    }      
                    
                }
            ]
    
        }
    }   
    
    onChartClick = (e) => {    
        if (e.dataType === "edge") {
            this.props.selectEdge(e.data.id)
        }
    }

    render() {
        return (
            <ReactEcharts
                style={{ height: "90%" }}
                option={this.getOption()}
                onEvents={{'click': this.onChartClick}}
            />
        )
    }
}

export default MailGraph