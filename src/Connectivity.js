import React, { Component } from "react"
import ReactEcharts from "echarts-for-react";

var num = 0

class Connectivity extends Component {

    getOption(data) {
        return {
            title: {
                text: "Connectivity",
                subtext: "Server Connectivity",
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
    
                    data: data.nodes.map(function (node) {
                        num = num+10
                        return {
                            x: node.x,
                            y: node.y+num,
                            id: node.id,
                            name: node.label,
                            symbolSize: node.size,
                            itemStyle: {
                                normal: {
                                    color: node.color
                                }
                            },
                            label: {
                            },
                        };
                    }),
                    edges: data.edges.map(function (edge) {
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
                        normal: {
                            position: 'bottom',
                            formatter: '{b}',
                            show: true
                        },
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
                //style={{ height: "300px" , margin: "25px"}}
                option={this.getOption(this.props.data)}
            />)
    }
}

export default Connectivity