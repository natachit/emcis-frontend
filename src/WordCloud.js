import React, { Component } from "react"
import data from "./data/wc22.json"
import ReactEcharts from "echarts-for-react";
import 'echarts-wordcloud'


class WordCloud extends Component {

    getOption(id) {
        return {
            title: {
                text: 'Wordcloud',
                subtext: "Word Frequency",
                textStyle: {
                    fontSize: 18,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                    fontWeight: 'normal'
                },
                padding: 15,
                top: 5,
            },
            backgroundColor: "white",
            tooltip: {},
            series: [ {
                type: 'wordCloud',
                gridSize: 2,
                sizeRange: [12, 30],
                rotationRange: [0,0],
                shape: 'pentagon',
                // width: 400,
                // height: 400,
                drawOutOfBound: true,
                textStyle: {
                    normal: {
                        color: function () {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data: Object.keys(data[id])
                .filter(key => {
                    return data[id][key] > 1
                })
                .map(function (key, index) {
                    //console.log(key, data[name][key])
                    return {
                        name: key,
                        value: data[id][key]  
                    };
                }),
            } ]
        }
    }

    render() {
        return (
            <ReactEcharts 
                style={{ height: "300px", margin: "25px"}}
                option={this.getOption(this.props.id)}
            />
        )
    }
}

export default WordCloud