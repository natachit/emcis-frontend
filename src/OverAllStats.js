import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';

class OverAllStats extends Component {

    convertObjectToArray(obj) {
        const color = ["#20a8d8", "#63c2de", "#ffc107", "#f86c6b"]
        const result = Object.keys(obj).map((key, index) => {
            return {
                id: index,
                name: key,
                value: obj[key],
                color: color[index],
                class: key === "Emails" ? "box-large" : "box-small"
            }
        })
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

export default OverAllStats