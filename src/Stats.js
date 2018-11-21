import React, { Component } from 'react';

class Stats extends Component {
    render() {
        return (
            <div style={{ margin: "20px", display: 'flex', flexWrap: 'wrap' }}>
                {
                    this.props.data.map(obj => {
                        return (
                            <div className="box" style={{ backgroundColor: obj.color }}>
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