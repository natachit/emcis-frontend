import React, { Component } from "react"
import ReactEcharts from "echarts-for-react";

class BarChart extends Component {
    getOption(data) {
        return {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: data,
                type: 'bar'
            }]
        }
    }

    render() {
        return <ReactEcharts option={this.getOption(this.props.data)} />
    }
}

export default BarChart
