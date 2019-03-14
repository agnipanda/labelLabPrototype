import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
    constructor(){
        super()
        this.state = {
            selectedFile: null,
            loaded: 0,
        }
        this.handleUpload = this.handleUpload.bind(this)
    }

    handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

    handleUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    axios
      .post("http://localhost:8000/upload", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          })
        },
      })
      .then(res => {
        console.log(res)
      })

  }
  render() {
      return (
        <div className="App">
          <input type="file" name="" id="" onChange={this.handleselectedFile} />
          <button onClick={this.handleUpload}>Upload</button>
          <div> {Math.round(this.state.loaded,2) } %</div>
        </div>
      )
  }
}
export default App;
