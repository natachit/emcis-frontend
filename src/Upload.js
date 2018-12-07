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
        loading: false
    }

    handleFile(e) {
        let file = e.target.files[0]
        this.setState({
            file: file
        })
    }

    handleUpload(e) {
        this.setState({
            loading: true
        })
        const formData = new FormData();
        formData.append("file", this.state.file);

        axios.post('http://158.108.33.19:5000/upload', formData)
            .then((res)=>{
                this.props.submit(res.data)
            })      
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
                    <div align="center">
                        <button type="button" onClick={(e) => this.handleUpload(e)}>Upload</button>
                        <br /><br />
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