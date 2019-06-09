import React, { Component } from "react"

class Page extends Component {
    render() {
        return (<button onClick={() => this.props.changeTab(this.props.page)}>{this.props.tab}</button>)
    }
}

export default Page