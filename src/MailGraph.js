import React, { Component } from "react"
import json from "./data/mail3.json"
import ReactEcharts from "echarts-for-react"

const img = ['https://png.pngtree.com/svg/20170602/avatar_107646.png',
            'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png',
            'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png',
            'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png',
            'https://cdn.iconscout.com/icon/free/png-256/avatar-367-456319.png',
            'https://png.pngtree.com/svg/20161217/avatar__181424.png',
            'https://www.presidia.it/wp-content/uploads/2015/09/flat-faces-icons-circle-3.png',
            'https://image.flaticon.com/icons/png/512/206/206853.png',
            'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png',
            'https://image.flaticon.com/icons/png/512/194/194838.png',
            'https://image.flaticon.com/icons/png/512/146/146022.png',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Creative-Tail-People-man-2.svg/1024px-Creative-Tail-People-man-2.svg.png',
            'https://cdn.icon-icons.com/icons2/582/PNG/512/wonder-women_icon-icons.com_55030.png']
var count


class MailGraph extends Component {

    getOption() {

        count = this.props.nodeImg
        return {
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    type: 'graph',
                    layout: 'none',
                    data: json.nodes.map(function (node) {
                        if (count<img.length)
                            count = count+1
                        else   
                            count = 0
                        return {
                            x: node.x,
                            y: node.y,
                            id: node.id,
                            name: node.label,
                            symbol: 'image://'+img[count],
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