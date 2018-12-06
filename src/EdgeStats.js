import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';


let color = ["#20c997", "#63c2de", "#20a8d8"]


class EdgeStats extends Component {

    convertObjectToArray(obj) {
        const result = Object.keys(obj).map((key, index) => {
            return {
                id: index,
                name: key,
                value: obj[key],
                color: color[index],
                // class: key === "Emails" ? "box-large" : "box-medium"
                class: "box-medium"
            }
        })
        color = [color[1], color[2], color[0]]
        return result
    }

    render() {
        const data = this.convertObjectToArray(this.props.data)
        return (
            <div className="box-wrapper">
                {
                    data.map(obj => {
                        return (
                            <div className={obj.class} style={{ backgroundColor: obj.color }}>
                                <p />
                                <AnimatedNumber 
                                    className="number" 
                                    component="text" 
                                    value={obj.value}
                                    duration={300}
                                    stepPrecision={0}
                                />
                                <p className="name">{obj.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default EdgeStats