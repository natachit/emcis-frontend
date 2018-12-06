import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import MailGraph from './MailGraph';
import WordCloud from './WordCloud';
import Connectivity from './Connectivity';
import OverAllStats from './OverAllStats';
import statJson from './data/overall-stats.json';
import edgeStats from './data/edge-stats';
import EdgeStats from './EdgeStats';
import Button from './Button'
import overAllWc from './data/all_wc_80.json'
import edgeWc from './data/edge_wc_top80.json'
import headerContents from './data/con_etc.json'
import contents from './data/content.json'
import mail3 from './data/mail3.json'
import ContentLists from './ContentLists';
import TestGraph from './TestGraph'
 
import "./App.css" 

const OVER_ALL = 0;
const NODE = 1;
const EDGE = 2;

const BAR_TITLE = ["Overall Analytics", "User Analytics", "Connection Analytics"]

class App extends Component {
  state = {
    sideBarState: OVER_ALL,
    id: 38,
    msgList: {},
    showContent: false,
    targetEmailIndex: 0,
    nodeImg: -1,
  }

  selectEdge = (id) => {
    this.setState({
      id: id,
      sideBarState: EDGE,
      msgList: mail3.edges[id].message_list,
      nodeImg: -1,
    })
  }

  changeSideBarState = () => {
    this.setState({
      sideBarState: OVER_ALL
    })
  }

  selectEmail = (index) => {
    console.log(headerContents)
    this.setState({
      showContent: true,
      targetEmailIndex: this.state.msgList[index],
    })
  }

  onClose = () => {
    this.setState({
      showContent: false,
    })
  }

  render() {
    return (
      <div className="App">
        <Modal open={this.state.showContent} onClose={this.onClose} center>
          <div>
            <div>
              <Connectivity id={this.state.targetEmailIndex} />
            </div>
            <div className="header">
              <p><span className="header-big"> {headerContents[this.state.targetEmailIndex][2]}</span></p>
              <p>From:<span className="hilight-blue"> {headerContents[this.state.targetEmailIndex][0]}</span></p>
              <p>To:<span className="hilight-blue"> {headerContents[this.state.targetEmailIndex][1]}</span></p>
              <p>Date:<span className="hilight-blue"> {headerContents[this.state.targetEmailIndex][3]}</span></p>
              <br></br><br></br>
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: contents[this.state.targetEmailIndex] }} />           
          </div>
        </Modal>
        <div>
          <MailGraph 
            selectEdge={this.selectEdge} 
            codeImg={this.state.nodeImg}
          />
        </div>
        <div className="mail-graph">
          <div className="mail-graph-bar">
            <p>E-mail Crime Investigation System</p>
          </div>
          <Button changeState={this.changeSideBarState}/>
          <MailGraph 
            selectEdge={this.selectEdge} 
            codeImg={this.state.nodeImg}
          />
          {/* <TestGraph /> */}
        </div>
        <div className="side-graph">
          <div className="side-graph-bar">
            <p>{BAR_TITLE[this.state.sideBarState]}</p>
            {
              this.state.sideBarState === EDGE && (
                <p className="side-graph-bar-subtitle">{mail3.edges[this.state.id].From} & {mail3.edges[this.state.id].To}</p>
              )
            }
          </div>
          <div className="side-graph-container">
          {
            this.state.sideBarState === OVER_ALL &&
            (
              <div>
                <OverAllStats data={statJson}/>
                <WordCloud data={overAllWc[0]}/>              
              </div>
            )
          }
          {
            this.state.sideBarState === EDGE && 
            (
              <div>
                <EdgeStats data={edgeStats[this.state.id]} />
                <WordCloud data={edgeWc[this.state.id]} />
                <ContentLists
                  headers={
                    this.state.msgList.map(index => {
                      return headerContents[index]
                    })
                  }
                  selectEmail={this.selectEmail}
                />
              </div>
            )
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
