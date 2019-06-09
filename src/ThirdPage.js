import React, { Component } from "react"
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'

import data from "./data/flare.json"

class ThirdPage extends Component {
    render() {
        return (
            <Tree
                data={data}
                height={700}
                width={1300}
                svgProps={{
                    className: 'custom'
                }}
            />
        )
    }
}

export default ThirdPage