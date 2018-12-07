import React, { Component } from 'react'
import './App.css'

import axios from 'axios'

class Upload extends Component {

    state = {
        file: null
    }

    handleFile(e) {
        let file = e.target.files[0]
        this.setState({
            file: file
        })
    }

    handleUpload(e) {
        const formData = new FormData();
        formData.append("file", this.state.file);
        axios({
            url: 'http://158.108.33.19:5000/upload',
            method: "POST",
            data: formData
        }).then((res)=>{
            console.log(res.data)
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
                    <button type="button" onClick={(e) => this.handleUpload(e)}>Upload</button>
                    <br /><br />
                    <p className="upload">**Only .mbox file are allowed</p>
                </form>
            </div>
        )
    }
}

export default Upload