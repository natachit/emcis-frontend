import React, { Component } from "react"

class Button extends Component {
    render() {
        return (<button className="home-button" onClick={this.props.changeState}><ion-icon name="home"></ion-icon></button>)
    }
}

export default Button