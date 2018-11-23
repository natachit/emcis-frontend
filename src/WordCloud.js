import React, { Component } from "react"
import ReactEcharts from "echarts-for-react";
import 'echarts-wordcloud'


class WordCloud extends Component {

    getOption(data) {

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
                data: Object.keys(data)//.slice(0, 60)
                .filter(key => {
                    return key.length < 15 
                })
                .map(function (key, index) {
                    //console.log(key, data[name][key])
                    return {
                        name: key,
                        value: data[key]  
                    };
                }),
            } ]
        }
    }

    render() {
        return (
            <ReactEcharts 
                style={{ height: "300px", margin: "25px"}}
                option={this.getOption(this.props.data)}
            />
        )
    }
}

export default WordCloud