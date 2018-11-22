import React, { Component } from "react"
import json from "./data/recgraph.json"
import ReactEcharts from "echarts-for-react";

class Connectivity extends Component {

    getOption(id) {
        return {
            title: {
                text: "Connectivity",
                textStyle: {
                    fontSize: 18,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                    fontWeight: 'normal'
                },
                padding: 15,
                top: 5,
            },
            backgroundColor: "white",
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    type: 'graph',
                    edgeSymbol: ['', 'arrow'],
    
                    data: json[id].nodes.map(function (node) {
                        return {
                            x: node.x,
                            y: node.y,
                            id: node.id,
                            name: node.label,
                            symbolSize: node.size,
                            itemStyle: {
                                normal: {
                                    color: node.color
                                }
                            }
                        };
                    }),
                    edges: json[id].edges.map(function (edge) {
                        return {
                            source: edge.by,
                            target: edge.fromm,
                            label: {
                    },
                         lineStyle: {
                              normal: {
                                  width: 1,
                                  curveness: 0.3,
                                  opacity: 1
                              }
                            }      
                        };
                    }),
                    label: {
                        rotationRange: [-90, 90],
                        emphasis: {
                            position: 'bottom',
                            show: true
                        }
                    },
                    roam: true,
                    focusNodeAdjacency: true,
                    
                }
            ]
        }
    }

    render() {
        return (
            <ReactEcharts
                style={{ height: "300px" , margin: "25px"}}
                option={this.getOption(this.props.id)}
            />)
    }
}

export default Connectivity