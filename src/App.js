import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import MailGraph from './MailGraph';
import WordCloud from './WordCloud';
import Connectivity from './Connectivity';
import OverAllStats from './OverAllStats';
import EdgeStats from './EdgeStats';
import Button from './Button'
import ContentLists from './ContentLists';
import Upload from './Upload'
import Page from './Page';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';

import "./App.css"
import mock from "./data/mock.json"

const OVER_ALL = 0;
// const NODE = 1;
const EDGE = 2;

const BAR_TITLE = ["Overall Analytics", "User Analytics", "Connection Analytics"]

class App extends Component {
  state = {
    data: mock,
    sideBarState: OVER_ALL,
    id: 38,
    msgList: {},
    showContent: false,
    targetEmailIndex: 0,
    nodeImg: -1,
    stat: {
      "Emails": mock.count_all_mail,
      "Users": mock.count_all_node,
      "Connections": mock.count_all_edge,
      "Words": mock.all_wc_count
    },
    uploaded: true,
    openUpload: false,
    tab: 1,
  }

  selectEdge = (id) => {
    this.setState({
      id: id,
      sideBarState: EDGE,
      msgList: this.state.data.edges[id].message_list,
      nodeImg: -1,
      stat: {
        Emails: this.state.data.edges[id].message_count, 
        Words: this.state.data.edge_wc_count_list[id]
      },
    })
  }

  changeSideBarState = () => {
    this.setState({
      sideBarState: OVER_ALL,
      stat: {
        "Emails": this.state.data.count_all_mail,
        "Users": this.state.data.count_all_node,
        "Connections": this.state.data.count_all_edge,
        "Words": this.state.data.all_wc_count
      },
    })
  }

  selectEmail = (index) => {
    this.setState({
      showContent: true,
      targetEmailIndex: this.state.msgList[index],
    })
  }

  onCloseContent = () => {
    this.setState({
      showContent: false,
    })
  }

  submitFile = (file) => {
    this.setState({
      uploaded: true,
      data: file,
      stat: {
        "Emails": file.count_all_mail,
        "Users": file.count_all_node,
        "Connections": file.count_all_edge,
        "Words": file.all_wc_count
      },
    })
  }

  onCloseUpload = () => {
    this.setState({ 
      openUpload: false,
      uploaded: true
    });
  };

  changeTab = (index) => {
    this.setState({
      tab: index
    })
  }

  render() {
    if (this.state.uploaded) {
      if (this.state.tab === 1) {
      return (
        <div className="App">
          <Modal open={this.state.showContent} onClose={this.onCloseContent} center>
            <div>
              <div>
                <Connectivity data={this.state.data.relayGraph[this.state.targetEmailIndex]}/>
              </div>
              <div className="header">
                <p><span className="header-big"> {this.state.data.list_con_etc[this.state.targetEmailIndex][2]}</span></p>
                <p>From:<span className="hilight-blue"> {this.state.data.list_con_etc[this.state.targetEmailIndex][0]}</span></p>
                <p>To:<span className="hilight-blue"> {this.state.data.list_con_etc[this.state.targetEmailIndex][1]}</span></p>
                <p>Date:<span className="hilight-blue"> {this.state.data.list_con_etc[this.state.targetEmailIndex][3]}</span></p>
                <br></br><br></br>
              </div>
              <div className="content" dangerouslySetInnerHTML={{ __html: this.state.data.list_content[this.state.targetEmailIndex] }} />           
            </div>
          </Modal>
          <div className="topnav">
            <Page changeTab={this.changeTab} tab={'EMCIS'} page={1}/>
            <Page changeTab={this.changeTab} tab={'Graph'} page={2}/>
            <Page changeTab={this.changeTab} tab={'Tree'} page={3}/>
          </div>
          <div className="mail-graph">
            <div className="mail-graph-bar">
              <p>E-mail Crime Investigation System</p>
            </div>
            <Button changeState={this.changeSideBarState}/>
            <MailGraph 
              nodes={this.state.data.nodes}
              edges={this.state.data.edges}
              selectEdge={this.selectEdge} 
              codeImg={this.state.nodeImg}
            />
          </div>
          <div className="side-graph">
            <div className="side-graph-bar">
              <p>{BAR_TITLE[this.state.sideBarState]}</p>
              {
                this.state.sideBarState === EDGE && (
                  <p className="side-graph-bar-subtitle">{this.state.data.edges[this.state.id].From} & {this.state.data.edges[this.state.id].To}</p>
                )
              }
            </div>
            <div className="side-graph-container">
              {
                this.state.sideBarState === OVER_ALL &&
                (
                  <div>
                    <OverAllStats data={this.state.stat}/>
                    <WordCloud data={this.state.data.all_wc_60[0]}/>              
                  </div>
                )
              }
              {
                this.state.sideBarState === EDGE && 
                (
                  <div>
                    <EdgeStats data={this.state.stat}
                    />
                    <WordCloud data={this.state.data.edge_wc_60[this.state.id]} />
                    <ContentLists
                      headers={
                        this.state.msgList.map(index => {
                          return this.state.data.list_con_etc[index]
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
      )}
      else if (this.state.tab === 2) {
        return (
          <div className="App">
            <div className="topnav">
              <Page changeTab={this.changeTab} tab={'EMCIS'} page={1}/>
              <Page changeTab={this.changeTab} tab={'Graph'} page={2}/>
              <Page changeTab={this.changeTab} tab={'Tree'} page={3}/>
            </div>
            <div className="page">
              <div className="page-content">
                <SecondPage />
              </div>
            </div>
          </div>
        )
      }
      else if (this.state.tab === 3) {
        return (
          <div className="App">
            <div className="topnav">
              <Page changeTab={this.changeTab} tab={'EMCIS'} page={1}/>
              <Page changeTab={this.changeTab} tab={'Graph'} page={2}/>
              <Page changeTab={this.changeTab} tab={'Tree'} page={3}/>
            </div>
            <div className="page">
              <div className="custom-container">
                <div className="page-content">
                  <ThirdPage />
                </div>
              </div>
            </div>
          </div>)
      }
    }
    else {
      return (
        <div className="App">
          <Modal open={this.state.openUpload} onClose={this.onCloseUpload} center>
            <div>
              <Upload submit={this.submitFile}/>
            </div>
          </Modal>
        </div>
      );
    }
  }
}

export default App;
