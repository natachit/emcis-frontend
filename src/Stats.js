import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';

class Stats extends Component {
    render() {
        return (
            <div>
                {
                    this.props.data.map(obj => {
                        var  name = "box"
                        if(obj.id > 1) {
                            name = "box-small"
                        }
                        return (
                            <div className={name} style={{ backgroundColor: obj.color }}>
                                <p />
                                <AnimatedNumber component="text" value={obj.value}
                                    style={{
                                        transition: '0.8s ease-out',
                                        fontSize: 48,
                                        transitionProperty:
                                            'background-color, color, opacity'
                                    }}
                                    frameStyle={perc => (
                                        perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
                                    )}
                                    duration={300}
                                    formatValue={n => prettyBytes(n)}
                                />
                                {/* <p className="number">{obj.value}</p> */}
                                <p className="name">{obj.name}</p>
                            </div>  
                        )        
                    })
                }
            </div>
        )
    }
}

export default Stats