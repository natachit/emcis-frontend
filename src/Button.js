import React, { Component } from "react"

class Button extends Component {
    render() {
        return (<button onClick={this.props.changeState}>Overall</button>)
    }
}

export default Button