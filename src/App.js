import React, { Component } from 'react';
import MailGraph from './MailGraph';
import WordCloud from './WordCloud';
import Connectivity from './Connectivity';
import OverAllStats from './OverAllStats';
import statJson from './data/overall-stats.json';
import edgeStats from './data/edge-stats';
import EdgeStats from './EdgeStats';

import "./App.css" 

const OVER_ALL = 0;
const NODE = 1;
const EDGE = 2;

class App extends Component {
  state = {
    sideBarState: OVER_ALL,
    id: 38,
    stats: [
      {
        id: 0,
        name: "Emails",
        value: 40,
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
    overAllStat: [
      {

      }
    ]
  }

  selectEdge = (id) => {
    this.setState({
      id: id,
      sideBarState: EDGE,
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
          {
            this.state.sideBarState === OVER_ALL &&
            (
              <div>
                <OverAllStats data={statJson}/>
                <WordCloud id={this.state.id}/>
                <Connectivity id={this.state.id}/>                
              </div>
            )
          }
          {
            this.state.sideBarState === EDGE && 
            (
              <div>
                <EdgeStats data={edgeStats[this.state.id]} />
                <WordCloud id={this.state.id} />
                <Connectivity id={this.state.id} />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
