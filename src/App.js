import React, { Component } from 'react';
import MailGraph from './MailGraph';
import WordCloud from './WordCloud';
import Connectivity from './Connectivity';

import "./App.css" 
import Stats from './Stats';

class App extends Component {
  state = {
    id: 38,
    stats: [
      {
        id: 0,
        name: "Emails",
        value: 50,
        color: "#20a8d8"
      },
      {
        id: 1,
        name: "Connections",
        value: 20,
        color: "#63c2de"
      },
      {
        id: 2,
        name: "Email Address",
        value: 30,
        color: "#ffc107"
      },
      {
        id: 3,
        name: "Word",
        value: 89,
        color: "#f86c6b"
      },
      {
        id: 4,
        name: "Server",
        value: 92,
        color: "#4dbd74"
      },
    ],
  }

  selectEdge = (id) => {
    this.setState({
      id: id
    })
  }

  render() {
    return (
      <div className="App">
        <div className="mail-graph">
          <div className="mail-graph-bar">
            <p>Bar</p>
          </div>
          <MailGraph selectEdge={this.selectEdge} />
        </div>
        <div className="side-graph">
          <div className="side-graph-bar">
            <p>Bar</p>
          </div>
          <Stats data={this.state.stats}/>
          <WordCloud id={this.state.id}/>
          <Connectivity id={this.state.id}/>
        </div>
      </div>
    );
  }
}

export default App;
