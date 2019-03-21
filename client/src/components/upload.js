import React from 'react';
import axios from 'axios';

class Upload extends React.Component {
    constructor() {
        super();
        this.state ={
            file: [],
            category: 'unlabelled'
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        let formData = new FormData();
        var files = (this.state.file);
        console.log(files.length);
        for (let i=0;i<files.length;i++) {
            formData.append("files",files[i]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        for (var value of formData.values()) {
            console.log(value);
        }
        axios.post("http://localhost:8000/uploads/"+this.state.category,formData,config)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
        });
    }
    onChange(e) {
        this.setState({file:e.target.files});
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="files" onChange= {this.onChange} multiple required/>
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default Upload;
