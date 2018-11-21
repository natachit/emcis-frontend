import React, { Component } from 'react';
import MailGraph from './MailGraph';
import WordCloud from './WordCloud';
import Connectivity from './Connectivity';

import "./App.css" 
import Stats from './Stats';

class App extends Component {
  state = {
    id: 0,
    stats: [
      {
        name: "email",
        value: 50,
        color: "#20a8d8"
      },
      {
        name: "connection",
        value: 20,
        color: "#63c2de"
      },
      {
        name: "emailAddress",
        value: 30,
        color: "#ffc107"
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
          <MailGraph selectEdge={this.selectEdge} />
        </div>
        <div className="side-graph">
          <WordCloud id={this.state.id}/>
          <Connectivity id={this.state.id}/>
          <Stats data={this.state.stats}/>
        </div>
      </div>
    );
  }
}

export default App;
