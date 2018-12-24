import React, { Component } from 'react'
import axios from 'axios'
import { css } from 'react-emotion';
import Loader from 'react-spinners/SyncLoader';

import './App.css'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Upload extends Component {

    state = {
        file: null,
        loading: false,
        error: ''
    }

    handleFile(e) {
        let file = e.target.files[0]
        this.setState({
            file: file
        })
    }

    handleUpload(e) {
        var type = this.state.file.name.split('.').slice(1).join('.')
        if (type !== 'mbox') {
            this.setState({
                error: 'File .'+type+' are not allowed.'
            })
        }
        else {
            this.setState({
                loading: true
            })
            const config = {
                onUploadProgress: function(progressEvent) {
                    var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                    console.log(percentCompleted)
                }
            }
            const formData = new FormData();
            formData.append("file", this.state.file);

            axios.post('http://158.108.33.19:5000/upload', formData, config)
                .then((res)=>{
                    this.props.submit(res.data)
                })   
        }   
    }

    render() {
        return (
            <div className="App">
                <form>
                    <h1>Upload file for investigation</h1>
                    <br />
                    <input type="file" name="file" onChange={(e) => this.handleFile(e)}></input>
                    <br /><br />
                    <p className="upload">**Only .mbox file are allowed</p>
                    <br />
                    <div align="center">
                        <button type="button" onClick={(e) => this.handleUpload(e)}>Upload</button>
                        <br /><br />
                        <p className="error">{this.state.error}</p>
                        <Loader
                            className={override}
                            sizeUnit={"px"}
                            size={10}
                            color={'#20c997'}
                            loading={this.state.loading}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default Upload