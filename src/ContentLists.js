import React, { Component } from "react"

class ContentLists extends Component {
    render() {
        console.log(this.props.headers)
        return (
            <div>
                {
                    this.props.headers.map(header => {   
                        return (
                            <div className="list">
                                <p className="list-title"><span className="hilight-grey">Subject:</span> {header[2]}</p>
                                <p className="list-subtitle"><span className="hilight-grey">From:</span> {header[1]}</p>
                                <p className="list-subtitle"><span className="hilight-grey">To:</span> {header[0]}</p>
                                <p className="list-subtitle"><span className="hilight-grey">Date:</span> {header[3]}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default ContentLists