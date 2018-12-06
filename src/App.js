import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import MailGraph from './MailGraph';
import WordCloud from './WordCloud';
import Connectivity from './Connectivity';
import OverAllStats from './OverAllStats';
import EdgeStats from './EdgeStats';
import Button from './Button'
import ContentLists from './ContentLists';
import TestGraph from './TestGraph'
import SimpleReactFileUpload from './SimpleFileUpload';
import Upload from './Upload'

import data from './data/mock.json'
 
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
    stat: {
      "Emails": data.count_all_mail,
      "Users": data.count_all_node,
      "Connections": data.count_all_edge,
      "Words": data.all_wc_count
    },
    uploaded: false,
  }

  selectEdge = (id) => {
    this.setState({
      id: id,
      sideBarState: EDGE,
      msgList: data.edges[id].message_list,
      nodeImg: -1,
      stat: {
        Emails: data.edges[id].message_count, 
        Words: data.edge_wc_count_list[id]
      },
    })
  }

  changeSideBarState = () => {
    this.setState({
      sideBarState: OVER_ALL,
      stat: {
        "Emails": data.count_all_mail,
        "Users": data.count_all_node,
        "Connections": data.count_all_edge,
        "Words": data.all_wc_count
      },
    })
  }

  selectEmail = (index) => {
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

  submitFile = () => {
    this.setState({
      uploaded: true,
    })
  }

  render() {
    return (
      <div className="App">
        <Modal open={!this.state.uploaded} center>
          <div className="upload">
            <Upload submit={this.submitFile}/>
          </div>
        </Modal>
        <Modal open={this.state.showContent} onClose={this.onClose} center>
          <div>
            <div>
              <Connectivity data={data.relayGraph[this.state.targetEmailIndex]}
                // id={this.state.targetEmailIndex} 
              />
            </div>
            <div className="header">
              <p><span className="header-big"> {data.list_con_etc[this.state.targetEmailIndex][2]}</span></p>
              <p>From:<span className="hilight-blue"> {data.list_con_etc[this.state.targetEmailIndex][0]}</span></p>
              <p>To:<span className="hilight-blue"> {data.list_con_etc[this.state.targetEmailIndex][1]}</span></p>
              <p>Date:<span className="hilight-blue"> {data.list_con_etc[this.state.targetEmailIndex][3]}</span></p>
              <br></br><br></br>
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: data.list_content[this.state.targetEmailIndex] }} />           
          </div>
        </Modal>
        <div className="mail-graph">
          <div className="mail-graph-bar">
            <p>E-mail Crime Investigation System</p>
          </div>
          <Button changeState={this.changeSideBarState}/>
          {/* <SimpleReactFileUpload /> */}
          <MailGraph 
            nodes={data.nodes}
            edges={data.edges}
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
                <p className="side-graph-bar-subtitle">{data.edges[this.state.id].From} & {data.edges[this.state.id].To}</p>
              )
            }
          </div>
          <div className="side-graph-container">
            {
              this.state.sideBarState === OVER_ALL &&
              (
                <div>
                  <OverAllStats data={this.state.stat}/>
                  <WordCloud data={data.all_wc_60[0]}/>              
                </div>
              )
            }
            {
              this.state.sideBarState === EDGE && 
              (
                <div>
                  <EdgeStats data={this.state.stat}
                    // {edgeStats[this.state.id]} 
                  />
                  <WordCloud data={data.edge_wc_60[this.state.id]} />
                  <ContentLists
                    headers={
                      this.state.msgList.map(index => {
                        return data.list_con_etc[index]
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
