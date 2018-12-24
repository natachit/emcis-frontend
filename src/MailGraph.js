import React, { Component } from "react"
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
            'http://www.iyrix.com/wp-content/uploads/2018/02/20161014_58006bf8f1610.png']
var count
var categories = [];
var n = -1;
var selected = {};


class MailGraph extends Component {

    getOption(nodes, edges) {

        count = this.props.nodeImg
        return {
            animationDurationUpdate: 800,
            animationEasingUpdate: 'quadraticOut',
            legend: [{
                type: 'scroll',
                data: categories.map(function (a) {
                    return {
                        name: a.name,   
                    }
                }),
                selected: selected,
                show: false
            }],
            series : [
                {
                    type: 'graph',
                    layout: 'none',
                    categories: categories,
                    data: nodes.map(function (node) {
                        if (count<img.length)
                            count = count+1
                        else   
                            count = 0
                        n = n+1;
                        categories[n] = {
                            name: node.label
                        }
                        selected[node.label] = true
                        return {
                            x: node.x,
                            y: node.y,
                            id: node.id,
                            name: node.label,
                            symbol: 'image://'+img[count],
                            symbolSize: node.size*3,
                            category: n,
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
                                position: 'bottom',
                                rotate: 90,
                                formatter: '{b}',
                                color: 'white'
                            },
                        };
                    }),
                    edges: edges.map(function (edge) {
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
                        },
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
            var d = this.echarts_react.getEchartsInstance()
            var s = e.data.source
            var t = e.data.target
            this.props.selectEdge(e.data.id)
            // this.echarts_react.getEchartsInstance().dispatchAction(
                // {
                //     type: 'focusNodeAdjacency',
                //     seriesIndex: 0,
                //     edgeDataIndex: e.data.id
                // },
            // )
            Object.keys(selected).forEach(function (key) {
                if (s === key || t === key) {
                    d.dispatchAction(
                        {
                            type: 'legendSelect',
                            name: key
                        },
                    )
                }
                else {
                    d.dispatchAction(
                        {
                            type: 'legendUnSelect',
                            name: key
                        },
                    )
                }
                
            })
        }
    }

    render() {
        return (
            <ReactEcharts 
                ref={(e) => { this.echarts_react = e; }}
                style={{ height: "90%" }}
                option={this.getOption(this.props.nodes, this.props.edges)}
                onEvents={{'click': this.onChartClick}}
            />
        )
    }
}

export default MailGraph