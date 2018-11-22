import React, { Component } from 'react';

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
                                <p className="number">{obj.value}</p>
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