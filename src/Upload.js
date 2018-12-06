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
        this.props.submit()
        console.log(this.state)
        // let file = this.state.file
        axios({
            url: 'http://158.108.33.19:5000/upload',
            method: "POST",
            headers: {
                authorization: 'token'
            },
            data: this.state.file
        }).then((res)=>{

        })
    }

    render() {
        return (
            <div className="App">
                <h1>THE FORM</h1>
                <form>
                    <div>
                        <label>Select File</label>
                        <input type="file" name="file" onChange={(e) => this.handleFile(e)}></input>
                    </div>
                    <br />
                    <button type="button" onClick={(e) => this.handleUpload(e)}>
                        Upload
                    </button>
                </form>
            </div>
        )
    }
}

export default Upload